interface RouterDefination {
  path: string
  component: any
}

const Router: RouterDefination[] = [
  {
    path: '*',
    component: require('../templates/options.vue').default
  }
]

export default Router;