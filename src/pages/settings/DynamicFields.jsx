import { PlusIcon } from '@heroicons/react/24/outline'

export default function DynamicFields() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Champs dynamiques</h1>
          <p className="mt-1 text-sm text-gray-500">
            Configurez les champs des formulaires véhicules et pièces
          </p>
        </div>
        <button className="btn-primary btn-md">
          <PlusIcon className="h-5 w-5 mr-2" />
          Nouveau champ
        </button>
      </div>

      <div className="card">
        <p className="text-center text-gray-500 py-12">Configuration des champs dynamiques</p>
      </div>
    </div>
  )
}
