import { useState } from 'react'
import { PlusIcon, PencilIcon, TrashIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

const mockSections = [
  { _id: '1', titre: 'Véhicules Neufs', code: 'vehicules_neufs', ordre: 1, actif: true },
  { _id: '2', titre: 'Véhicules d\'Occasion', code: 'vehicules_occasion', ordre: 2, actif: true },
  { _id: '3', titre: 'Pièces Populaires', code: 'pieces_populaires', ordre: 3, actif: true },
]

export default function MobileSections() {
  const [sections, setSections] = useState(mockSections)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sections mobiles</h1>
          <p className="mt-1 text-sm text-gray-500">
            Configurez l'accueil de l'application mobile
          </p>
        </div>
        <button className="btn-primary btn-md">
          <PlusIcon className="h-5 w-5 mr-2" />
          Nouvelle section
        </button>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Ordre</th>
                <th>Titre</th>
                <th>Code</th>
                <th>Statut</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sections.map((section) => (
                <tr key={section._id}>
                  <td>{section.ordre}</td>
                  <td className="font-medium text-gray-900">{section.titre}</td>
                  <td className="text-gray-500">{section.code}</td>
                  <td>
                    <span className={`badge ${section.actif ? 'badge-success' : 'badge-gray'}`}>
                      {section.actif ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                        {section.actif ? <EyeIcon className="h-5 w-5" /> : <EyeSlashIcon className="h-5 w-5" />}
                      </button>
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
