import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import toast from 'react-hot-toast'
import { ArrowLeftIcon, PhotoIcon } from '@heroicons/react/24/outline'

const validationSchema = Yup.object({
  titre: Yup.string().required('Le titre est requis'),
  typeVehicule: Yup.string().required('Le type est requis'),
  marque: Yup.string().required('La marque est requise'),
  modele: Yup.string().required('Le modèle est requis'),
  annee: Yup.number().required('L\'année est requise').min(1900).max(new Date().getFullYear() + 1),
  prix: Yup.number().required('Le prix est requis').min(0),
})

export default function VehicleForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = Boolean(id)

  const formik = useFormik({
    initialValues: {
      titre: '',
      typeVehicule: '',
      description: '',
      marque: '',
      modele: '',
      annee: new Date().getFullYear(),
      kilometrage: 0,
      carburant: '',
      boite: '',
      couleur: '',
      nombrePortes: 4,
      nombrePlaces: 5,
      prix: 0,
      prixPromo: 0,
      statut: 'brouillon',
      miseEnAvant: false,
      nouveau: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        toast.success(isEdit ? 'Véhicule modifié avec succès' : 'Véhicule créé avec succès')
        navigate('/vehicles')
      } catch (error) {
        toast.error('Une erreur est survenue')
      }
    },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/vehicles')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEdit ? 'Modifier le véhicule' : 'Nouveau véhicule'}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Remplissez les informations du véhicule
          </p>
        </div>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Informations générales
          </h2>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="titre" className="label">
                Titre du véhicule *
              </label>
              <input
                id="titre"
                type="text"
                className={`input ${formik.touched.titre && formik.errors.titre ? 'input-error' : ''}`}
                placeholder="Ex: Toyota Corolla 2024"
                {...formik.getFieldProps('titre')}
              />
              {formik.touched.titre && formik.errors.titre && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.titre}</p>
              )}
            </div>

            <div>
              <label htmlFor="typeVehicule" className="label">
                Type de véhicule *
              </label>
              <select
                id="typeVehicule"
                className={`input ${formik.touched.typeVehicule && formik.errors.typeVehicule ? 'input-error' : ''}`}
                {...formik.getFieldProps('typeVehicule')}
              >
                <option value="">Sélectionner un type</option>
                <option value="neuf">Véhicule Neuf</option>
                <option value="occasion">Véhicule d'Occasion</option>
              </select>
              {formik.touched.typeVehicule && formik.errors.typeVehicule && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.typeVehicule}</p>
              )}
            </div>

            <div>
              <label htmlFor="statut" className="label">
                Statut
              </label>
              <select
                id="statut"
                className="input"
                {...formik.getFieldProps('statut')}
              >
                <option value="brouillon">Brouillon</option>
                <option value="publie">Publié</option>
                <option value="indisponible">Indisponible</option>
                <option value="vendu">Vendu</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="description" className="label">
                Description
              </label>
              <textarea
                id="description"
                rows={4}
                className="input"
                placeholder="Description détaillée du véhicule..."
                {...formik.getFieldProps('description')}
              />
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Caractéristiques techniques
          </h2>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label htmlFor="marque" className="label">
                Marque *
              </label>
              <input
                id="marque"
                type="text"
                className={`input ${formik.touched.marque && formik.errors.marque ? 'input-error' : ''}`}
                placeholder="Toyota"
                {...formik.getFieldProps('marque')}
              />
              {formik.touched.marque && formik.errors.marque && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.marque}</p>
              )}
            </div>

            <div>
              <label htmlFor="modele" className="label">
                Modèle *
              </label>
              <input
                id="modele"
                type="text"
                className={`input ${formik.touched.modele && formik.errors.modele ? 'input-error' : ''}`}
                placeholder="Corolla"
                {...formik.getFieldProps('modele')}
              />
              {formik.touched.modele && formik.errors.modele && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.modele}</p>
              )}
            </div>

            <div>
              <label htmlFor="annee" className="label">
                Année *
              </label>
              <input
                id="annee"
                type="number"
                className={`input ${formik.touched.annee && formik.errors.annee ? 'input-error' : ''}`}
                {...formik.getFieldProps('annee')}
              />
              {formik.touched.annee && formik.errors.annee && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.annee}</p>
              )}
            </div>

            <div>
              <label htmlFor="kilometrage" className="label">
                Kilométrage
              </label>
              <input
                id="kilometrage"
                type="number"
                className="input"
                placeholder="0"
                {...formik.getFieldProps('kilometrage')}
              />
            </div>

            <div>
              <label htmlFor="carburant" className="label">
                Carburant
              </label>
              <select
                id="carburant"
                className="input"
                {...formik.getFieldProps('carburant')}
              >
                <option value="">Sélectionner</option>
                <option value="Essence">Essence</option>
                <option value="Diesel">Diesel</option>
                <option value="Hybride">Hybride</option>
                <option value="Électrique">Électrique</option>
              </select>
            </div>

            <div>
              <label htmlFor="boite" className="label">
                Boîte de vitesse
              </label>
              <select
                id="boite"
                className="input"
                {...formik.getFieldProps('boite')}
              >
                <option value="">Sélectionner</option>
                <option value="Manuelle">Manuelle</option>
                <option value="Automatique">Automatique</option>
              </select>
            </div>

            <div>
              <label htmlFor="couleur" className="label">
                Couleur
              </label>
              <input
                id="couleur"
                type="text"
                className="input"
                placeholder="Blanc"
                {...formik.getFieldProps('couleur')}
              />
            </div>

            <div>
              <label htmlFor="nombrePortes" className="label">
                Nombre de portes
              </label>
              <input
                id="nombrePortes"
                type="number"
                className="input"
                {...formik.getFieldProps('nombrePortes')}
              />
            </div>

            <div>
              <label htmlFor="nombrePlaces" className="label">
                Nombre de places
              </label>
              <input
                id="nombrePlaces"
                type="number"
                className="input"
                {...formik.getFieldProps('nombrePlaces')}
              />
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Prix
          </h2>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="prix" className="label">
                Prix (FCFA) *
              </label>
              <input
                id="prix"
                type="number"
                className={`input ${formik.touched.prix && formik.errors.prix ? 'input-error' : ''}`}
                placeholder="15000000"
                {...formik.getFieldProps('prix')}
              />
              {formik.touched.prix && formik.errors.prix && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.prix}</p>
              )}
            </div>

            <div>
              <label htmlFor="prixPromo" className="label">
                Prix promotionnel (FCFA)
              </label>
              <input
                id="prixPromo"
                type="number"
                className="input"
                placeholder="0"
                {...formik.getFieldProps('prixPromo')}
              />
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Images
          </h2>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-primary-500 transition-colors cursor-pointer">
            <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              Cliquez pour ajouter des images ou glissez-déposez
            </p>
            <p className="text-xs text-gray-500 mt-1">
              PNG, JPG jusqu'à 10MB
            </p>
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Options
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                id="miseEnAvant"
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                {...formik.getFieldProps('miseEnAvant')}
              />
              <label htmlFor="miseEnAvant" className="ml-3 text-sm font-medium text-gray-700">
                Mettre en avant ce véhicule
              </label>
            </div>

            <div className="flex items-center">
              <input
                id="nouveau"
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                {...formik.getFieldProps('nouveau')}
              />
              <label htmlFor="nouveau" className="ml-3 text-sm font-medium text-gray-700">
                Marquer comme nouveau
              </label>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/vehicles')}
            className="btn-secondary btn-md"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="btn-primary btn-md"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Enregistrement...' : isEdit ? 'Modifier' : 'Créer'}
          </button>
        </div>
      </form>
    </div>
  )
}
