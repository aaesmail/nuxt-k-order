export default async function({ store, route, redirect }) {
  if (!store.state.auth.admin) return redirect('/admin/login')
}
