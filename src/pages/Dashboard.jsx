import { useQuery } from '@tanstack/react-query'
import {
  TruckIcon,
  WrenchScrewdriverIcon,
  ShoppingCartIcon,
  ChatBubbleLeftRightIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  EyeIcon,
} from '@heroicons/react/24/outline'
import { Line, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const stats = [
  {
    name: 'Véhicules',
    value: '156',
    change: '+12%',
    changeType: 'increase',
    icon: TruckIcon,
    color: 'bg-blue-500',
  },
  {
    name: 'Pièces détachées',
    value: '2,847',
    change: '+8%',
    changeType: 'increase',
    icon: WrenchScrewdriverIcon,
    color: 'bg-green-500',
  },
  {
    name: 'Commandes',
    value: '89',
    change: '-3%',
    changeType: 'decrease',
    icon: ShoppingCartIcon,
    color: 'bg-yellow-500',
  },
  {
    name: 'Messages',
    value: '24',
    change: '+5',
    changeType: 'increase',
    icon: ChatBubbleLeftRightIcon,
    color: 'bg-purple-500',
  },
]

const recentOrders = [
  {
    id: 'CMD-2024-0089',
    client: 'Mohamed Diallo',
    produit: 'Toyota Corolla 2024',
    montant: '15,000,000 FCFA',
    statut: 'nouvelle',
    date: '2024-12-24',
  },
  {
    id: 'CMD-2024-0088',
    client: 'Fatou Sow',
    produit: 'Plaquettes de frein',
    montant: '45,000 FCFA',
    statut: 'confirmee',
    date: '2024-12-23',
  },
  {
    id: 'CMD-2024-0087',
    client: 'Amadou Ba',
    produit: 'Mercedes Classe C',
    montant: '22,500,000 FCFA',
    statut: 'en_preparation',
    date: '2024-12-23',
  },
]

const topProducts = [
  { nom: 'Toyota Corolla 2024', vues: 1234, type: 'vehicule' },
  { nom: 'Plaquettes de frein', vues: 892, type: 'piece' },
  { nom: 'Honda Civic 2023', vues: 756, type: 'vehicule' },
  { nom: 'Filtre à huile', vues: 643, type: 'piece' },
  { nom: 'Mercedes Classe E', vues: 521, type: 'vehicule' },
]

const getStatusBadge = (statut) => {
  const badges = {
    nouvelle: 'badge-info',
    confirmee: 'badge-success',
    en_preparation: 'badge-warning',
    disponible: 'badge-success',
    livree: 'badge-gray',
    annulee: 'badge-danger',
  }
  return badges[statut] || 'badge-gray'
}

const getStatusLabel = (statut) => {
  const labels = {
    nouvelle: 'Nouvelle',
    confirmee: 'Confirmée',
    en_preparation: 'En préparation',
    disponible: 'Disponible',
    livree: 'Livrée',
    annulee: 'Annulée',
  }
  return labels[statut] || statut
}

export default function Dashboard() {
  const chartData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
    datasets: [
      {
        label: 'Commandes',
        data: [65, 59, 80, 81, 56, 55, 70, 85, 92, 78, 89, 95],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
    ],
  }

  const barData = {
    labels: ['Véhicules neufs', 'Véhicules occasion', 'Pièces'],
    datasets: [
      {
        label: 'Ventes',
        data: [45, 32, 89],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(245, 158, 11, 0.8)',
        ],
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="mt-1 text-sm text-gray-500">
          Vue d'ensemble de votre plateforme MAB
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="card">
            <div className="flex items-center">
              <div className={`flex-shrink-0 rounded-lg ${stat.color} p-3`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  <span
                    className={`ml-2 flex items-center text-sm font-medium ${
                      stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {stat.changeType === 'increase' ? (
                      <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
                    ) : (
                      <ArrowTrendingDownIcon className="h-4 w-4 mr-1" />
                    )}
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Évolution des commandes
          </h3>
          <div className="h-64">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Ventes par catégorie
          </h3>
          <div className="h-64">
            <Bar data={barData} options={chartOptions} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Commandes récentes
            </h3>
            <a href="/orders" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
              Voir tout
            </a>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">{order.id}</p>
                    <span className={`badge ${getStatusBadge(order.statut)}`}>
                      {getStatusLabel(order.statut)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{order.client}</p>
                  <p className="text-xs text-gray-500 mt-1">{order.produit}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-sm font-semibold text-gray-900">{order.montant}</p>
                    <p className="text-xs text-gray-500">{order.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Produits populaires
            </h3>
            <EyeIcon className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {topProducts.map((product, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-lg bg-primary-100 flex items-center justify-center">
                      {product.type === 'vehicule' ? (
                        <TruckIcon className="h-5 w-5 text-primary-600" />
                      ) : (
                        <WrenchScrewdriverIcon className="h-5 w-5 text-primary-600" />
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{product.nom}</p>
                    <p className="text-xs text-gray-500">
                      {product.type === 'vehicule' ? 'Véhicule' : 'Pièce détachée'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <EyeIcon className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-semibold text-gray-900">
                    {product.vues.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
