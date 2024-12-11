import React, { useState } from 'react';

const IMEICheckPage = () => {
  const [imei, setImei] = useState('');
  const [service, setService] = useState('3');
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckIMEI = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!imei) {
      alert("Please enter a valid IMEI number.");
      return;
    }

    try {
      setIsLoading(true);

      // Call the backend API to fetch IMEI information
      const response = await fetch(`/api/check-imei?imei=${imei}&service=${service}`);
      if (!response.ok) {
        throw new Error('Failed to fetch IMEI information');
      }

      const data = await response.json();
      setResult(data);
      setIsLoading(false);

    } catch (error) {
      console.error('Error fetching IMEI information:', error);
      setIsLoading(false);
      alert('There was an error processing your request. Please try again.');
    }
  };

  const parseResult = (resultString: string) => {
    const resultLines = resultString.split('<br>');
    const parsedResult: Record<string, string> = {};

    resultLines.forEach((line) => {
      if (line) {
        const [key, value] = line.split(':');
        if (key && value) {
          // Clean up the SIM-Lock field
          if (key.trim() === 'SIM-Lock') {
            parsedResult[key.trim()] = value.includes('Unlocked') ? 'Unlocked' : 'Locked';
          } else {
            parsedResult[key.trim()] = value.replace(/<.*?>/g, '').trim();
          }
        }
      }
    });

    return parsedResult;
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', backgroundColor: '#1c1c1c', color: '#ffffff', borderRadius: '8px' }}>
      <h1>IMEI Check Service</h1>
      <form onSubmit={handleCheckIMEI} style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          IMEI Number:
          <input
            type="text"
            value={imei}
            onChange={(e) => setImei(e.target.value)}
            style={{ marginLeft: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </label>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Select Service:
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            style={{ marginLeft: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="3">Find My iPhone Status</option>
            <option value="8">SIM Lock Info</option>
          </select>
        </label>
        <button
          type="submit"
          style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Check IMEI
        </button>
      </form>
      {isLoading && <p>Processing and fetching report...</p>}
      {result && (
        <div style={{ padding: '15px', borderRadius: '8px', backgroundColor: '#2d2d2d', marginTop: '20px' }}>
          <h3>IMEI Information:</h3>
          {result.status === 'success' ? (
            <div>
              {Object.entries(parseResult(result.result)).map(([key, value]) => (
                <p key={key} style={{ margin: '8px 0' }}>
                  <strong>{key}:</strong> {value}
                </p>
              ))}
            </div>
          ) : (
            <p style={{ color: 'red' }}>Error fetching information: {result.error}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default IMEICheckPage;

