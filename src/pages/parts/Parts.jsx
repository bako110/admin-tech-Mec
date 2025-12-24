import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import {
  PlusIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

const mockParts = [
  {
    _id: '1',
    titre: 'Plaquettes de frein avant',
    typePiece: { nom: 'Freinage' },
    champsDynamiques: {
      reference: 'REF-FR-001',
      marque: 'Bosch',
      etat: 'Neuf',
    },
    prix: 45000,
    stock: 25,
    statut: 'publie',
    vues: 892,
  },
  {
    _id: '2',
    titre: 'Filtre à huile',
    typePiece: { nom: 'Moteur' },
    champsDynamiques: {
      reference: 'REF-MOT-015',
      marque: 'Mann',
      etat: 'Neuf',
    },
    prix: 12000,
    stock: 150,
    statut: 'publie',
    vues: 643,
  },
]

export default function Parts() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')

  const { data: parts = mockParts, isLoading } = useQuery({
    queryKey: ['parts'],
    queryFn: async () => mockParts,
  })

  const filteredParts = parts.filter((part) => {
    const matchesSearch = part.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.champsDynamiques.reference.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || part.typePiece.nom === filterType
    return matchesSearch && matchesType
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pièces détachées</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gérez votre catalogue de pièces automobiles
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Link to="/parts/types" className="btn-secondary btn-md">
            <Cog6ToothIcon className="h-5 w-5 mr-2" />
            Types de pièces
          </Link>
          <Link to="/parts/new" className="btn-primary btn-md">
            <PlusIcon className="h-5 w-5 mr-2" />
            Ajouter une pièce
          </Link>
        </div>
      </div>

      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une pièce..."
              className="input pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="input sm:w-48"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">Tous les types</option>
            <option value="Moteur">Moteur</option>
            <option value="Freinage">Freinage</option>
            <option value="Suspension">Suspension</option>
            <option value="Électricité">Électricité</option>
          </select>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <p className="mt-2 text-sm text-gray-500">Chargement...</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Pièce</th>
                  <th>Type</th>
                  <th>Prix</th>
                  <th>Stock</th>
                  <th>Statut</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredParts.map((part) => (
                  <tr key={part._id}>
                    <td>
                      <div>
                        <p className="font-medium text-gray-900">{part.titre}</p>
                        <p className="text-sm text-gray-500">
                          Réf: {part.champsDynamiques.reference} • {part.champsDynamiques.marque}
                        </p>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-info">
                        {part.typePiece.nom}
                      </span>
                    </td>
                    <td className="font-semibold text-gray-900">
                      {part.prix.toLocaleString()} FCFA
                    </td>
                    <td>
                      <span className={`badge ${part.stock > 10 ? 'badge-success' : 'badge-warning'}`}>
                        {part.stock} unités
                      </span>
                    </td>
                    <td>
                      <span className="badge badge-success">Publié</span>
                    </td>
                    <td>
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          to={`/parts/edit/${part._id}`}
                          className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </Link>
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
        )}
      </div>
    </div>
  )
}
