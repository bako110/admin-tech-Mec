import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import toast from 'react-hot-toast'
import { useAuthStore } from '../../store/authStore'
import { authService } from '../../services/authService'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Email invalide')
    .required('Email requis'),
  motDePasse: Yup.string()
    .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
    .required('Mot de passe requis'),
})

export default function Login() {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      email: '',
      motDePasse: '',
      rememberMe: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true)
      try {
        const data = await authService.login(values.email, values.motDePasse)
        login(data.admin, data.token)
        toast.success('Connexion réussie!')
        navigate('/')
      } catch (error) {
        toast.error(error.response?.data?.message || 'Erreur de connexion')
      } finally {
        setIsLoading(false)
      }
    },
  })

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-8">
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-primary-600 rounded-xl flex items-center justify-center">
              <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              MAB Admin
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Plateforme de gestion véhicules & pièces
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="label">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className={`input ${formik.touched.email && formik.errors.email ? 'input-error' : ''}`}
                  placeholder="admin@mab.com"
                  {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="motDePasse" className="label">
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    id="motDePasse"
                    name="motDePasse"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    className={`input pr-10 ${formik.touched.motDePasse && formik.errors.motDePasse ? 'input-error' : ''}`}
                    placeholder="••••••••"
                    {...formik.getFieldProps('motDePasse')}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {formik.touched.motDePasse && formik.errors.motDePasse && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.motDePasse}</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  {...formik.getFieldProps('rememberMe')}
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                  Se souvenir de moi
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                  Mot de passe oublié?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary btn-lg w-full"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Connexion...
                </div>
              ) : (
                'Se connecter'
              )}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Version 1.0.0
                </span>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-white/80">
          © 2024 MAB. Tous droits réservés.
        </p>
      </div>
    </div>
  )
}
