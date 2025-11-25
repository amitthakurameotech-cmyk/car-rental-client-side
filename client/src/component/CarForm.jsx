import React, { useState } from "react";
import { createCar, updateCar } from "../services/car";

export default function CarForm({ onCarAdded, existingCar, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    type: "",
    year: "",
    pricePerDay: "",
    fuelType: "",
    transmission: "",
    seats: "",
    location: "",
    description: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  React.useEffect(() => {
    if (existingCar) {
      setFormData({
        name: existingCar.name || "",
        brand: existingCar.brand || "",
        type: existingCar.type || "",
        year: existingCar.year || "",
        pricePerDay: existingCar.pricePerDay || existingCar.price || "",
        fuelType: existingCar.fuelType || "",
        transmission: existingCar.transmission || "",
        seats: existingCar.seats || "",
        location: existingCar.location || "",
        description: existingCar.description || "",
      });
      if (existingCar.image) setPreview(existingCar.image);
    }
  }, [existingCar]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // prepare payload: if image present use FormData
      let payload = formData;
      if (image) {
        payload = new FormData();
        Object.keys(formData).forEach((key) => {
          payload.append(key, formData[key]);
        });
        payload.append("image", image);
      }

      let res;
      if (existingCar && (existingCar._id || existingCar.id)) {
        // update existing car
        const id = existingCar._id || existingCar.id;
        res = await updateCar(id, payload);
        alert("✅ Car updated successfully!");
      } else {
        // create new car
        res = await createCar(payload);
        alert("✅ Car added successfully!");
      }

      const returned = res?.data || res?.data?.data || res;
      if (onCarAdded) onCarAdded(returned);
      // reset only when creating new car
      if (!existingCar) {
        setFormData({
          name: "",
          brand: "",
          type: "",
          year: "",
          pricePerDay: "",
          fuelType: "",
          transmission: "",
          seats: "",
          location: "",
          description: "",
        });
        setImage(null);
        setPreview(null);
      }
      if (onCancel) onCancel();
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Error saving car");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">Add New Car</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {Object.keys(formData).map((key) => (
          <input
            key={key}
            type="text"
            name={key}
            placeholder={key}
            value={formData[key]}
            onChange={handleChange}
            required
            className="border rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        ))}
        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-600">Car Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              setImage(file || null);
              setPreview(file ? URL.createObjectURL(file) : null);
            }}
            className="text-sm"
          />
          {/* simple check indicator when image selected */}
          <span aria-hidden className={`ml-2 ${image ? 'text-green-600' : 'text-gray-400'}`}>
            {image ? '✔' : '○'}
          </span>
        </div>
        {preview && (
          <img src={preview} alt="preview" className="w-32 h-20 object-cover rounded-md mt-2" />
        )}
        <button
          type="submit"
          className="bg-indigo-600 text-white rounded-md py-2 hover:bg-indigo-700 transition"
        >
          {existingCar ? 'Save Changes' : 'Add Car'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="mt-2 text-sm text-gray-600 underline">Cancel</button>
        )}
      </form>
    </div>
  );
}
