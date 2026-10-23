import { Component, computed } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-dashboard-layout',
  styleUrl: './dashboard-layout.css',
  templateUrl: './dashboard-layout.html',
})
export class DashboardLayout {

  options = computed(() => [
    {label: 'Proyectos', to:'/proyectos', icon: '#i-folder'},
    {label: 'Tareas', to: '/tareas', icon: '#i-check'}
  ])
}
