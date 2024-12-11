use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    program_error::ProgramError,
    pubkey::Pubkey,
    system_instruction,
    sysvar::{rent::Rent, Sysvar},
    program::invoke,
};

entrypoint!(process_instruction);

fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    _instruction_data: &[u8],
) -> ProgramResult {
    let accounts_iter = &mut accounts.iter();
    
    // Get payer account
    let payer_account = next_account_info(accounts_iter)?;
    if !payer_account.is_signer {
        msg!("Payer must be a signer");
        return Err(ProgramError::MissingRequiredSignature);
    }

    // Get the account where payment is being transferred
    let payment_account = next_account_info(accounts_iter)?;
    let system_program = next_account_info(accounts_iter)?;

    // Define the required payment amount (in lamports, smallest unit of SOL)
    let payment_amount: u64 = 1000000; // e.g., 0.001 SOL

    // Transfer payment from the payer to the payment account
    let transfer_instruction = system_instruction::transfer(
        payer_account.key,
        payment_account.key,
        payment_amount,
    );

    invoke(
        &transfer_instruction,
        &[
            payer_account.clone(),
            payment_account.clone(),
            system_program.clone(),
        ],
    )?;

    msg!("Payment of {} lamports made successfully by user", payment_amount);

    // Emit event or handle additional business logic here
    msg!("Proceed to call backend API for IMEI report or emit event");

    Ok(())
}
