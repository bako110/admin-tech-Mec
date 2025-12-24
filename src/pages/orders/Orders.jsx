import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { MagnifyingGlassIcon, EyeIcon } from '@heroicons/react/24/outline'

const mockOrders = [
  {
    _id: '1',
    numeroCommande: 'CMD-2024-0089',
    client: { nom: 'Mohamed', prenom: 'Diallo', telephone: '+221 77 123 45 67' },
    produits: [{ titre: 'Toyota Corolla 2024', prix: 15000000, quantite: 1 }],
    total: 15000000,
    statut: { nom: 'Nouvelle', code: 'nouvelle', couleur: 'blue' },
    dateCommande: '2024-12-24T10:30:00',
  },
  {
    _id: '2',
    numeroCommande: 'CMD-2024-0088',
    client: { nom: 'Fatou', prenom: 'Sow', telephone: '+221 76 987 65 43' },
    produits: [{ titre: 'Plaquettes de frein', prix: 45000, quantite: 2 }],
    total: 90000,
    statut: { nom: 'Confirmée', code: 'confirmee', couleur: 'green' },
    dateCommande: '2024-12-23T15:20:00',
  },
]

const getStatusBadge = (code) => {
  const badges = {
    nouvelle: 'badge-info',
    confirmee: 'badge-success',
    en_preparation: 'badge-warning',
    disponible: 'badge-success',
    livree: 'badge-gray',
    annulee: 'badge-danger',
  }
  return badges[code] || 'badge-gray'
}

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const { data: orders = mockOrders, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => mockOrders,
  })

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.numeroCommande.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.client.nom.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || order.statut.code === filterStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Commandes</h1>
        <p className="mt-1 text-sm text-gray-500">
          Gérez toutes les commandes clients
        </p>
      </div>

      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une commande..."
              className="input pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="input sm:w-48"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Tous les statuts</option>
            <option value="nouvelle">Nouvelle</option>
            <option value="confirmee">Confirmée</option>
            <option value="en_preparation">En préparation</option>
            <option value="disponible">Disponible</option>
            <option value="livree">Livrée</option>
            <option value="annulee">Annulée</option>
          </select>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>N° Commande</th>
                <th>Client</th>
                <th>Produits</th>
                <th>Total</th>
                <th>Statut</th>
                <th>Date</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order._id}>
                  <td className="font-medium text-gray-900">{order.numeroCommande}</td>
                  <td>
                    <div>
                      <p className="font-medium text-gray-900">
                        {order.client.prenom} {order.client.nom}
                      </p>
                      <p className="text-sm text-gray-500">{order.client.telephone}</p>
                    </div>
                  </td>
                  <td>
                    <p className="text-sm text-gray-900">{order.produits[0].titre}</p>
                    {order.produits.length > 1 && (
                      <p className="text-xs text-gray-500">+{order.produits.length - 1} autre(s)</p>
                    )}
                  </td>
                  <td className="font-semibold text-gray-900">
                    {order.total.toLocaleString()} FCFA
                  </td>
                  <td>
                    <span className={`badge ${getStatusBadge(order.statut.code)}`}>
                      {order.statut.nom}
                    </span>
                  </td>
                  <td className="text-gray-500">
                    {new Date(order.dateCommande).toLocaleDateString('fr-FR')}
                  </td>
                  <td>
                    <div className="flex items-center justify-end">
                      <Link
                        to={`/orders/${order._id}`}
                        className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg"
                      >
                        <EyeIcon className="h-5 w-5" />
                      </Link>
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
