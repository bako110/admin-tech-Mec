import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeftIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline'

export default function OrderDetail() {
  const navigate = useNavigate()
  const { id } = useParams()

  const order = {
    numeroCommande: 'CMD-2024-0089',
    client: {
      nom: 'Diallo',
      prenom: 'Mohamed',
      telephone: '+221 77 123 45 67',
      email: 'mohamed.diallo@email.com',
      adresse: 'Dakar, Sénégal',
    },
    produits: [
      { titre: 'Toyota Corolla 2024', prix: 15000000, quantite: 1, sousTotal: 15000000 },
    ],
    total: 15000000,
    statut: 'nouvelle',
    dateCommande: '2024-12-24T10:30:00',
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button onClick={() => navigate('/orders')} className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{order.numeroCommande}</h1>
          <p className="text-sm text-gray-500">
            {new Date(order.dateCommande).toLocaleString('fr-FR')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Produits</h2>
            <div className="space-y-4">
              {order.produits.map((produit, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{produit.titre}</p>
                    <p className="text-sm text-gray-500">Quantité: {produit.quantite}</p>
                  </div>
                  <p className="font-semibold text-gray-900">
                    {produit.sousTotal.toLocaleString()} FCFA
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between text-lg font-bold">
                <span>Total</span>
                <span>{order.total.toLocaleString()} FCFA</span>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Statut de la commande</h2>
            <select className="input">
              <option value="nouvelle">Nouvelle</option>
              <option value="confirmee">Confirmée</option>
              <option value="en_preparation">En préparation</option>
              <option value="disponible">Disponible</option>
              <option value="livree">Livrée</option>
              <option value="annulee">Annulée</option>
            </select>
            <button className="btn-primary btn-md w-full mt-4">
              Mettre à jour le statut
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Informations client</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Nom complet</p>
                <p className="font-medium text-gray-900">
                  {order.client.prenom} {order.client.nom}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Téléphone</p>
                <a href={`tel:${order.client.telephone}`} className="flex items-center text-primary-600 hover:text-primary-700">
                  <PhoneIcon className="h-4 w-4 mr-2" />
                  {order.client.telephone}
                </a>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <a href={`mailto:${order.client.email}`} className="flex items-center text-primary-600 hover:text-primary-700">
                  <EnvelopeIcon className="h-4 w-4 mr-2" />
                  {order.client.email}
                </a>
              </div>
              <div>
                <p className="text-sm text-gray-500">Adresse</p>
                <p className="text-gray-900">{order.client.adresse}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
