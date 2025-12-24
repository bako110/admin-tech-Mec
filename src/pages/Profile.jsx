import { useAuthStore } from '../store/authStore'
import { UserCircleIcon } from '@heroicons/react/24/outline'

export default function Profile() {
  const { user } = useAuthStore()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Mon profil</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="mx-auto h-24 w-24 rounded-full bg-primary-600 flex items-center justify-center mb-4">
            <span className="text-white font-bold text-3xl">
              {user?.nom?.charAt(0) || 'A'}
            </span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900">{user?.nom || 'Admin'}</h2>
          <p className="text-sm text-gray-500">{user?.email || 'admin@mab.com'}</p>
          <span className="inline-block mt-2 badge badge-info">
            {user?.role || 'Administrateur'}
          </span>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Informations personnelles
            </h3>
            <div className="space-y-4">
              <div>
                <label className="label">Nom complet</label>
                <input type="text" className="input" defaultValue={user?.nom} />
              </div>
              <div>
                <label className="label">Email</label>
                <input type="email" className="input" defaultValue={user?.email} />
              </div>
              <div>
                <label className="label">Téléphone</label>
                <input type="tel" className="input" defaultValue={user?.telephone} />
              </div>
              <button className="btn-primary btn-md">Mettre à jour</button>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Changer le mot de passe
            </h3>
            <div className="space-y-4">
              <div>
                <label className="label">Mot de passe actuel</label>
                <input type="password" className="input" />
              </div>
              <div>
                <label className="label">Nouveau mot de passe</label>
                <input type="password" className="input" />
              </div>
              <div>
                <label className="label">Confirmer le mot de passe</label>
                <input type="password" className="input" />
              </div>
              <button className="btn-primary btn-md">Changer le mot de passe</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
