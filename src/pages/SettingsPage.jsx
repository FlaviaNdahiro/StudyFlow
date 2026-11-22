
import useLocalStorage from '../hooks/useLocalStorage'
import useDocumentTitle from '../hooks/useDocumentTitle'

function SettingsPage() {
  const [settings, setSettings] = useLocalStorage('studyflow-settings', {
    theme: 'light',
    dailyGoal: 120,
  })

  useDocumentTitle('Settings')

  function updateSetting(name, value) {
    setSettings((previousSettings) => ({
      ...previousSettings,
      [name]: value,
    }))
  }

  function resetSettings() {
    setSettings({
      theme: 'light',
      dailyGoal: 120,
    })
  }

  return (
    <div>
      <div className="mb-8">
        <p className="text-teal-600 font-semibold">
          PERSONALIZE YOUR EXPERIENCE
        </p>

        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
          Settings
        </h1>

        <p className="text-slate-500 mt-2">
          Customize your StudyFlow experience.
        </p>
      </div>

      <div className="space-y-6">

        {/* Theme Settings */}
        <section className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Appearance
          </h2>

          <p className="text-slate-500 mt-2">
            Choose your preferred theme.
          </p>

          <div className="flex gap-4 mt-5 flex-wrap">
            <button
              onClick={() => updateSetting('theme', 'light')}
              className={`px-6 py-3 rounded-xl font-semibold ${
                settings.theme === 'light'
                  ? 'bg-teal-500 text-white'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              ☀️ Light Mode
            </button>

            <button
              onClick={() => updateSetting('theme', 'dark')}
              className={`px-6 py-3 rounded-xl font-semibold ${
                settings.theme === 'dark'
                  ? 'bg-teal-500 text-white'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              🌙 Dark Mode
            </button>
          </div>
        </section>

        {/* Daily Goal Settings */}
        <section className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Daily Study Goal
          </h2>

          <p className="text-slate-500 mt-2">
            Set how many minutes you want to study each day.
          </p>

          <div className="mt-5">
            <label
              htmlFor="dailyGoal"
              className="block text-slate-700 font-medium mb-2"
            >
              Study minutes per day
            </label>

            <select
              id="dailyGoal"
              value={settings.dailyGoal}
              onChange={(event) =>
                updateSetting('dailyGoal', Number(event.target.value))
              }
              className="w-full sm:w-64 border border-slate-200 rounded-xl p-3 bg-white text-slate-700"
            >
              <option value={30}>30 minutes</option>
              <option value={60}>1 hour</option>
              <option value={90}>1 hour 30 minutes</option>
              <option value={120}>2 hours</option>
              <option value={180}>3 hours</option>
              <option value={240}>4 hours</option>
            </select>
          </div>

          <p className="text-teal-600 font-semibold mt-4">
            Your daily goal: {settings.dailyGoal} minutes
          </p>
        </section>

        {/* Reset Settings */}
        <section className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Reset Preferences
          </h2>

          <p className="text-slate-500 mt-2">
            Restore your settings to their default values.
          </p>

          <button
            onClick={resetSettings}
            className="mt-5 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Reset Settings
          </button>
        </section>

      </div>
    </div>
  )
}

export default SettingsPage
