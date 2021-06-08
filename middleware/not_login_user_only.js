export default async function({ store, route, redirect }) {
  if (store.state.auth.user) return redirect('/')
}
