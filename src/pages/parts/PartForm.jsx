import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import toast from 'react-hot-toast'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

const validationSchema = Yup.object({
  titre: Yup.string().required('Le titre est requis'),
  typePiece: Yup.string().required('Le type est requis'),
  reference: Yup.string().required('La référence est requise'),
  prix: Yup.number().required('Le prix est requis').min(0),
  stock: Yup.number().required('Le stock est requis').min(0),
})

export default function PartForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = Boolean(id)

  const formik = useFormik({
    initialValues: {
      titre: '',
      typePiece: '',
      description: '',
      reference: '',
      marque: '',
      etat: 'Neuf',
      garantie: '',
      origine: '',
      prix: 0,
      stock: 0,
      stockMin: 5,
      statut: 'brouillon',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        toast.success(isEdit ? 'Pièce modifiée avec succès' : 'Pièce créée avec succès')
        navigate('/parts')
      } catch (error) {
        toast.error('Une erreur est survenue')
      }
    },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/parts')}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEdit ? 'Modifier la pièce' : 'Nouvelle pièce'}
          </h1>
        </div>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Informations générales
          </h2>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="titre" className="label">Titre *</label>
              <input
                id="titre"
                type="text"
                className={`input ${formik.touched.titre && formik.errors.titre ? 'input-error' : ''}`}
                {...formik.getFieldProps('titre')}
              />
              {formik.touched.titre && formik.errors.titre && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.titre}</p>
              )}
            </div>

            <div>
              <label htmlFor="typePiece" className="label">Type de pièce *</label>
              <select
                id="typePiece"
                className={`input ${formik.touched.typePiece && formik.errors.typePiece ? 'input-error' : ''}`}
                {...formik.getFieldProps('typePiece')}
              >
                <option value="">Sélectionner</option>
                <option value="moteur">Moteur</option>
                <option value="freinage">Freinage</option>
                <option value="suspension">Suspension</option>
                <option value="electricite">Électricité</option>
              </select>
            </div>

            <div>
              <label htmlFor="reference" className="label">Référence *</label>
              <input
                id="reference"
                type="text"
                className={`input ${formik.touched.reference && formik.errors.reference ? 'input-error' : ''}`}
                {...formik.getFieldProps('reference')}
              />
            </div>

            <div>
              <label htmlFor="marque" className="label">Marque</label>
              <input id="marque" type="text" className="input" {...formik.getFieldProps('marque')} />
            </div>

            <div>
              <label htmlFor="etat" className="label">État</label>
              <select id="etat" className="input" {...formik.getFieldProps('etat')}>
                <option value="Neuf">Neuf</option>
                <option value="Occasion">Occasion</option>
                <option value="Reconditionné">Reconditionné</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="description" className="label">Description</label>
              <textarea
                id="description"
                rows={4}
                className="input"
                {...formik.getFieldProps('description')}
              />
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Stock & Prix</h2>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <label htmlFor="stock" className="label">Stock *</label>
              <input
                id="stock"
                type="number"
                className={`input ${formik.touched.stock && formik.errors.stock ? 'input-error' : ''}`}
                {...formik.getFieldProps('stock')}
              />
            </div>

            <div>
              <label htmlFor="stockMin" className="label">Stock minimum</label>
              <input id="stockMin" type="number" className="input" {...formik.getFieldProps('stockMin')} />
            </div>

            <div>
              <label htmlFor="prix" className="label">Prix (FCFA) *</label>
              <input
                id="prix"
                type="number"
                className={`input ${formik.touched.prix && formik.errors.prix ? 'input-error' : ''}`}
                {...formik.getFieldProps('prix')}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-4">
          <button type="button" onClick={() => navigate('/parts')} className="btn-secondary btn-md">
            Annuler
          </button>
          <button type="submit" className="btn-primary btn-md">
            {isEdit ? 'Modifier' : 'Créer'}
          </button>
        </div>
      </form>
    </div>
  )
}
