import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { EventosComponent } from './features/administrador/eventos/eventos.component';
import { DocenteComponent } from './features/docente/docente.component';
import { CoordinadorComponent } from './features/coordinador/coordinador.component';

export const routes: Routes = [

  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

  /* AUTH */

  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth-routing-module')
        .then(m => m.AuthRoutes)
  },

  /* DASHBOARD GENERAL */

  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layout/dashboard/dashboard')
        .then(m => m.DashboardComponent)
  },

  /* ================= DOCENTE ================= */

  {
    path: 'docente',
    component: DocenteComponent,
    canActivate: [authGuard],
    children: [

      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/docente/dashboard/docente-dashboard.component')
            .then(m => m.DocenteDashboardComponent)
      },

      {
        path: 'crear-evento',
        loadComponent: () =>
          import('./features/docente/crear-evento/crear-evento.component')
            .then(m => m.CrearEventoComponent)
      },

      {
        path: 'mis-eventos',
        loadComponent: () =>
          import('./features/docente/mis-eventos/mis-eventos.component')
            .then(m => m.MisEventosComponent)
      },

      {
        path: 'ia/generar-juego',
        loadComponent: () =>
          import('./modules/ia/generar-juego')
            .then(m => m.GenerarJuegoComponent)
      },

      {
        path: 'evento/:id',
        loadComponent: () =>
          import('./features/docente/detalle-evento/detalle-evento.component')
            .then(m => m.DetalleEventoComponent)
      }

    ]
  },

  /* ================= COORDINADOR ================= */

  {
    path: 'coordinador',
    component: CoordinadorComponent,
    canActivate: [authGuard],
    children: [

      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/coordinador/dashboard/dashboard-coordinador.component')
            .then(m => m.DashboardCoordinadorComponent)
      },

      {
        path: 'aprobar-eventos',
        loadComponent: () =>
          import('./features/coordinador/aprobar-eventos/aprobar-eventos')
            .then(m => m.AprobarEventosComponent)
      },
        {
        path: 'eventos',
        loadComponent: () =>
          import('./features/coordinador/eventos/eventos')
            .then(m => m.EventosComponent)
      }

    ]
  },

  /* ================= ADMIN ================= */

  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/administrador/administrador.component')
        .then(m => m.AdministradorComponent),

    children: [

      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/administrador/dashboard.component')
            .then(m => m.DashboardComponent)
      },

      {
        path: 'usuarios',
        loadComponent: () =>
          import('./features/administrador/usuarios.component')
            .then(m => m.UsuariosComponent)
      },

      {
        path: 'usuarios/editar/:id',
        loadComponent: () =>
          import('./features/administrador/editar-usuario.component')
            .then(m => m.EditarUsuarioComponent)
      },

      {
        path: 'sesiones',
        loadComponent: () =>
          import('./features/administrador/sesiones/sesiones')
            .then(m => m.SesionesComponent)
      },

      {
        path: 'backups',
        loadComponent: () =>
          import('./features/administrador/backups/backups.component')
            .then(m => m.BackupsComponent)
      },

      { path: 'eventos', component: EventosComponent }

    ]
  },

  /*  DECANO  */

  {
    path: 'decano',
    canActivate: [authGuard],
    children: [

      {
        path: 'eventos',
        loadComponent: () =>
          //import('./features/decano/eventos/eventos')
          import('./features/decano/eventos/eventos')
            .then(m => m.EventosComponent)
      }

    ]
  },

  /*  ESTUDIANTE  */

  {
    path: 'estudiante',
    canActivate: [authGuard],
    children: [

      {
        path: 'eventos',
        loadComponent: () =>
          //import('./features/estudiante/eventos/eventos')
            import('./features/estudiante/eventos/eventos')
            .then(m => m.EventosComponent)
      }

    ]
  },


  {
  path: 'asistente',
  canActivate: [authGuard],
  children: [

    { path: '', redirectTo: 'eventos', pathMatch: 'full' },

    {
      path: 'eventos',
     loadComponent: () =>
  import('./features/asistente/eventos/eventos')
    .then(m => m.EventosComponent)
    }

  ]
},

  /* ================= FALLBACK ================= */

  { path: '**', redirectTo: 'auth/login' }

];