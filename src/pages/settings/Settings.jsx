import { Link } from 'react-router-dom'
import {
  DevicePhoneMobileIcon,
  PhotoIcon,
  AdjustmentsHorizontalIcon,
  BellIcon,
} from '@heroicons/react/24/outline'

const settingsCategories = [
  {
    name: 'Sections mobiles',
    description: 'Configurez l\'accueil de l\'application mobile',
    icon: DevicePhoneMobileIcon,
    href: '/settings/mobile-sections',
    color: 'bg-blue-500',
  },
  {
    name: 'Bannières',
    description: 'Gérez les bannières promotionnelles',
    icon: PhotoIcon,
    href: '/settings/banners',
    color: 'bg-purple-500',
  },
  {
    name: 'Champs dynamiques',
    description: 'Configurez les champs des formulaires',
    icon: AdjustmentsHorizontalIcon,
    href: '/settings/dynamic-fields',
    color: 'bg-green-500',
  },
  {
    name: 'Notifications',
    description: 'Paramètres des notifications',
    icon: BellIcon,
    href: '/settings/notifications',
    color: 'bg-yellow-500',
  },
]

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
        <p className="mt-1 text-sm text-gray-500">
          Configurez votre plateforme MAB
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {settingsCategories.map((category) => (
          <Link
            key={category.name}
            to={category.href}
            className="card hover:shadow-md transition-shadow"
          >
            <div className={`${category.color} rounded-lg p-3 w-fit mb-4`}>
              <category.icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
            <p className="mt-1 text-sm text-gray-500">{category.description}</p>
          </Link>
        ))}
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Configuration générale</h2>
        <div className="space-y-4">
          <div>
            <label className="label">Nom de l'application</label>
            <input type="text" className="input" defaultValue="MAB" />
          </div>
          <div>
            <label className="label">Devise</label>
            <select className="input">
              <option value="FCFA">FCFA</option>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
            </select>
          </div>
          <button className="btn-primary btn-md">Enregistrer</button>
        </div>
      </div>
    </div>
  )
}
