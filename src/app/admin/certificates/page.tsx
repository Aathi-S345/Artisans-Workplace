import React from 'react';
import Card from '@/components/UI/Card';
import { Button } from "@/components/UI/Button";


const pendingCertificates = [
  { id: 2, artisan: 'Jane Smith', name: 'Master Weaver Certification', date: '2023-05-01' },
  { id: 4, artisan: 'Mark Brown', name: 'Certified Woodworker', date: '2023-05-12' },
];

export default function ValidateCertificates() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Validate Certificates</h1>
      <Card>
        <h2 className="text-xl font-semibold mb-4">Pending Review ({pendingCertificates.length})</h2>
        <div className="space-y-3">
          {pendingCertificates.map(cert => (
            <div key={cert.id} className="border p-3 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <p className="font-semibold">{cert.name}</p>
                <p className="text-sm text-gray-600">Submitted by {cert.artisan} on {new Date(cert.date).toLocaleDateString()}</p>
              </div>
              <div className="flex space-x-3 mt-2 sm:mt-0">
                <Button variant="secondary" className="text-sm py-1 px-3">View</Button>
                <button className="bg-green-500 hover:bg-green-600 text-white text-sm py-1 px-3 rounded-lg">Approve</button>
                <button className="bg-red-500 hover:bg-red-600 text-white text-sm py-1 px-3 rounded-lg">Reject</button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}