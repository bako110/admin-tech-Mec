import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import {
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

const mockVehicles = [
  {
    _id: '1',
    titre: 'Toyota Corolla 2024',
    typeVehicule: { nom: 'Neuf' },
    champsDynamiques: {
      marque: 'Toyota',
      modele: 'Corolla',
      annee: 2024,
      kilometrage: 0,
      carburant: 'Hybride',
      boite: 'Automatique',
      couleur: 'Blanc',
    },
    prix: 15000000,
    statut: 'publie',
    miseEnAvant: true,
    images: [{ url: '/placeholder-car.jpg', principale: true }],
    vues: 1234,
    dateCreation: '2024-12-20',
  },
  {
    _id: '2',
    titre: 'Mercedes Classe E 2022',
    typeVehicule: { nom: 'Occasion' },
    champsDynamiques: {
      marque: 'Mercedes',
      modele: 'Classe E',
      annee: 2022,
      kilometrage: 25000,
      carburant: 'Diesel',
      boite: 'Automatique',
      couleur: 'Noir',
    },
    prix: 22500000,
    statut: 'publie',
    miseEnAvant: false,
    images: [{ url: '/placeholder-car.jpg', principale: true }],
    vues: 892,
    dateCreation: '2024-12-18',
  },
]

const getStatusBadge = (statut) => {
  const badges = {
    brouillon: 'badge-gray',
    publie: 'badge-success',
    indisponible: 'badge-warning',
    vendu: 'badge-danger',
  }
  return badges[statut] || 'badge-gray'
}

const getStatusLabel = (statut) => {
  const labels = {
    brouillon: 'Brouillon',
    publie: 'Publié',
    indisponible: 'Indisponible',
    vendu: 'Vendu',
  }
  return labels[statut] || statut
}

export default function Vehicles() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  const { data: vehicles = mockVehicles, isLoading } = useQuery({
    queryKey: ['vehicles'],
    queryFn: async () => {
      return mockVehicles
    },
  })

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?')) {
      toast.success('Véhicule supprimé avec succès')
    }
  }

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch = vehicle.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.champsDynamiques.marque.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || vehicle.typeVehicule.nom === filterType
    const matchesStatus = filterStatus === 'all' || vehicle.statut === filterStatus
    return matchesSearch && matchesType && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Véhicules</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gérez tous vos véhicules neufs et d'occasion
          </p>
        </div>
        <Link to="/vehicles/new" className="btn-primary btn-md">
          <PlusIcon className="h-5 w-5 mr-2" />
          Ajouter un véhicule
        </Link>
      </div>

      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un véhicule..."
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
            <option value="Neuf">Neuf</option>
            <option value="Occasion">Occasion</option>
          </select>
          <select
            className="input sm:w-48"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Tous les statuts</option>
            <option value="brouillon">Brouillon</option>
            <option value="publie">Publié</option>
            <option value="indisponible">Indisponible</option>
            <option value="vendu">Vendu</option>
          </select>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <p className="mt-2 text-sm text-gray-500">Chargement...</p>
          </div>
        ) : filteredVehicles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucun véhicule trouvé</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Véhicule</th>
                  <th>Type</th>
                  <th>Prix</th>
                  <th>Statut</th>
                  <th>Vues</th>
                  <th>Date</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredVehicles.map((vehicle) => (
                  <tr key={vehicle._id}>
                    <td>
                      <div className="flex items-center">
                        <div className="h-12 w-12 flex-shrink-0 rounded-lg bg-gray-200 overflow-hidden">
                          <img
                            src={vehicle.images[0]?.url || '/placeholder-car.jpg'}
                            alt={vehicle.titre}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="flex items-center">
                            <p className="font-medium text-gray-900">{vehicle.titre}</p>
                            {vehicle.miseEnAvant && (
                              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                                ⭐ Mise en avant
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">
                            {vehicle.champsDynamiques.annee} • {vehicle.champsDynamiques.kilometrage.toLocaleString()} km
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-info">
                        {vehicle.typeVehicule.nom}
                      </span>
                    </td>
                    <td className="font-semibold text-gray-900">
                      {vehicle.prix.toLocaleString()} FCFA
                    </td>
                    <td>
                      <span className={`badge ${getStatusBadge(vehicle.statut)}`}>
                        {getStatusLabel(vehicle.statut)}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center text-gray-500">
                        <EyeIcon className="h-4 w-4 mr-1" />
                        {vehicle.vues}
                      </div>
                    </td>
                    <td className="text-gray-500">
                      {new Date(vehicle.dateCreation).toLocaleDateString('fr-FR')}
                    </td>
                    <td>
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          to={`/vehicles/edit/${vehicle._id}`}
                          className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                          title="Modifier"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(vehicle._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Supprimer"
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
        )}
      </div>
    </div>
  )
}
