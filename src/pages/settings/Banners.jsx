import { PlusIcon } from '@heroicons/react/24/outline'

export default function Banners() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bannières</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gérez les bannières promotionnelles de l'application mobile
          </p>
        </div>
        <button className="btn-primary btn-md">
          <PlusIcon className="h-5 w-5 mr-2" />
          Nouvelle bannière
        </button>
      </div>

      <div className="card">
        <p className="text-center text-gray-500 py-12">Aucune bannière configurée</p>
      </div>
    </div>
  )
}
