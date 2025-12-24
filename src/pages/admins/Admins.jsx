import { useState } from 'react'
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

const mockAdmins = [
  {
    _id: '1',
    nom: 'Admin Principal',
    email: 'admin@mab.com',
    role: 'super_admin',
    actif: true,
    dernierConnexion: '2024-12-24T10:30:00',
  },
  {
    _id: '2',
    nom: 'Agent Commercial',
    email: 'agent@mab.com',
    role: 'agent',
    actif: true,
    dernierConnexion: '2024-12-23T15:20:00',
  },
]

export default function Admins() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Administrateurs</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gérez les utilisateurs administrateurs
          </p>
        </div>
        <button className="btn-primary btn-md">
          <PlusIcon className="h-5 w-5 mr-2" />
          Nouvel administrateur
        </button>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Rôle</th>
                <th>Statut</th>
                <th>Dernière connexion</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockAdmins.map((admin) => (
                <tr key={admin._id}>
                  <td className="font-medium text-gray-900">{admin.nom}</td>
                  <td className="text-gray-500">{admin.email}</td>
                  <td>
                    <span className="badge badge-info">
                      {admin.role === 'super_admin' ? 'Super Admin' : 'Agent'}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${admin.actif ? 'badge-success' : 'badge-gray'}`}>
                      {admin.actif ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td className="text-gray-500">
                    {new Date(admin.dernierConnexion).toLocaleDateString('fr-FR')}
                  </td>
                  <td>
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg">
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
