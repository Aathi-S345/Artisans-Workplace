import React from 'react';
import Card from '@/components/UI/Card';
import { Button } from "@/components/UI/Button";


const trainingMaterials = [
  { id: 1, title: 'Product Photography Basics', type: 'Video' },
  { id: 2, title: 'Writing Compelling Product Descriptions', type: 'Article' },
];

export default function ManageTraining() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Training Content</h1>
        <Button>Add New Material</Button>
      </div>
      <Card>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-3">Title</th>
              <th className="p-3">Type</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {trainingMaterials.map(material => (
              <tr key={material.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{material.title}</td>
                <td className="p-3">{material.type}</td>
                <td className="p-3 flex space-x-2">
                  <button className="text-blue-600 hover:underline text-sm">Edit</button>
                  <button className="text-red-600 hover:underline text-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}