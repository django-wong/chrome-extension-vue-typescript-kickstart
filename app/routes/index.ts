interface RouterDefination {
  path: string
  component: any
}

const Router: RouterDefination[] = [ 
  {
    path: '/',
    component: require('../templates/index.vue').default
  }
]

export default Router;