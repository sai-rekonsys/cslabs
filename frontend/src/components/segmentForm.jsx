import { useState } from "react";
import axios from 'axios';

const SegmentForm = () => {
  const schemaOptions = [
    { label: 'First Name', value: 'first_name' },
    { label: 'Last Name', value: 'last_name' },
    { label: 'Gender', value: 'gender' },
    { label: 'Age', value: 'age' },
    { label: 'Account Name', value: 'account_name' },
    { label: 'City', value: 'city' },
    { label: 'State', value: 'state' },
  ];

  const [showModal, setShowModal] = useState(false);
  const [segmentName, setSegmentName] = useState('');
  const [schemas, setSchemas] = useState([]);
  const [selectedSchema, setSelectedSchema] = useState('');
  const [availableSchemas, setAvailableSchemas] = useState(schemaOptions);

  const handleAddSchema = () => {
    if (selectedSchema) {
      const selectedOption = availableSchemas.find(
        (schema) => schema.value === selectedSchema
      );
      // Add the schema in the correct format { "value": "Label" }
      setSchemas([...schemas, { [selectedOption.value]: selectedOption.label }]);
      setAvailableSchemas(
        availableSchemas.filter((schema) => schema.value !== selectedSchema)
      );
      setSelectedSchema("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      segment_name: segmentName,
      schema: schemas,  // This now matches the required format
    };

    try {
      await axios.post('http://localhost:3001/api/segments', payload);
      alert('Segment saved successfully!');
      // Reset form after submission
      setSegmentName('');
      setSchemas([]);
      setAvailableSchemas(schemaOptions);
      setShowModal(false);
    } catch (error) {
      console.error('Error saving segment:', error);
      alert('Failed to save segment');
    }
  };

  return (
    <div className="p-6">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => setShowModal(true)}
      >
        Save Segment
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md w-1/3">
            <h2 className="text-lg font-semibold mb-4">Saving Segment</h2>
            <input
              type="text"
              placeholder="Enter segment name"
              className="border p-2 w-full mb-4"
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
            />
            <div className="border p-4 mb-4">
              {schemas.map((schema, index) => (
                <div key={index} className="mb-2">
                  {/* Render added schemas */}
                  <select value={Object.keys(schema)[0]} disabled className="border p-2 w-full">
                    <option>{Object.values(schema)[0]}</option>
                  </select>
                </div>
              ))}

              <select
                className="border p-2 w-full"
                value={selectedSchema}
                onChange={(e) => setSelectedSchema(e.target.value)}
              >
                <option value="" disabled>
                  Add schema to segment
                </option>
                {availableSchemas.map((schema) => (
                  <option key={schema.value} value={schema.value}>
                    {schema.label}
                  </option>
                ))}
              </select>

              <button className="text-blue-500 mt-2" onClick={handleAddSchema}>
                + Add new schema
              </button>
            </div>

            <div className="flex justify-between">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleSubmit}
              >
                Save the Segment
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SegmentForm;
