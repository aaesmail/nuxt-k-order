export default async function({ store, route, redirect }) {
  if (store.state.auth.restaurant) return redirect('/restaurant')
}
