import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { PlusIcon, PencilIcon, TrashIcon, ArrowsUpDownIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

const mockPartTypes = [
  { _id: '1', nom: 'Moteur', code: 'moteur', ordre: 1, actif: true, nombrePieces: 145 },
  { _id: '2', nom: 'Freinage', code: 'freinage', ordre: 2, actif: true, nombrePieces: 89 },
  { _id: '3', nom: 'Suspension', code: 'suspension', ordre: 3, actif: true, nombrePieces: 67 },
  { _id: '4', nom: 'Électricité', code: 'electricite', ordre: 4, actif: true, nombrePieces: 123 },
]

export default function PartTypes() {
  const [showModal, setShowModal] = useState(false)
  const [editingType, setEditingType] = useState(null)

  const { data: partTypes = mockPartTypes } = useQuery({
    queryKey: ['partTypes'],
    queryFn: async () => mockPartTypes,
  })

  const handleEdit = (type) => {
    setEditingType(type)
    setShowModal(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Supprimer ce type de pièce ?')) {
      toast.success('Type supprimé')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Types de pièces</h1>
          <p className="mt-1 text-sm text-gray-500">
            Configurez les catégories de pièces détachées
          </p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary btn-md">
          <PlusIcon className="h-5 w-5 mr-2" />
          Nouveau type
        </button>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Ordre</th>
                <th>Nom</th>
                <th>Code</th>
                <th>Nombre de pièces</th>
                <th>Statut</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {partTypes.map((type) => (
                <tr key={type._id}>
                  <td>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <ArrowsUpDownIcon className="h-4 w-4 text-gray-400" />
                    </button>
                    <span className="ml-2">{type.ordre}</span>
                  </td>
                  <td className="font-medium text-gray-900">{type.nom}</td>
                  <td className="text-gray-500">{type.code}</td>
                  <td>
                    <span className="badge badge-info">{type.nombrePieces} pièces</span>
                  </td>
                  <td>
                    <span className={`badge ${type.actif ? 'badge-success' : 'badge-gray'}`}>
                      {type.actif ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleEdit(type)}
                        className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(type._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
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

      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-gray-900/80" onClick={() => setShowModal(false)} />
            <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {editingType ? 'Modifier le type' : 'Nouveau type'}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="label">Nom</label>
                  <input type="text" className="input" placeholder="Ex: Transmission" />
                </div>
                <div>
                  <label className="label">Code</label>
                  <input type="text" className="input" placeholder="transmission" />
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-primary-600 rounded" defaultChecked />
                  <label className="ml-2 text-sm text-gray-700">Actif</label>
                </div>
              </div>
              <div className="flex items-center justify-end space-x-3 mt-6">
                <button onClick={() => setShowModal(false)} className="btn-secondary btn-sm">
                  Annuler
                </button>
                <button className="btn-primary btn-sm">Enregistrer</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
