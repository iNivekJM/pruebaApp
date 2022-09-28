import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona } from '../pages/gestion/persona.interface';

@Injectable({
  providedIn: 'root'
})
export class GestionService {

  constructor(private http: HttpClient) { }

  private apiUrl: String = 'https://632c95941aabd837399f4600.mockapi.io/api/v1/person';

  listarTipoId(): Observable<any> {
    const url = 'https://632c95941aabd837399f4600.mockapi.io/api/v1/tipoidentificacion';
    return this.http.get<any>(url);
  }

  listarTodos(): Observable<Persona[]> {
    const url = `${this.apiUrl}`;
    return this.http.get<Persona[]>(url);
  }

  listarUno(id: string): Observable<Persona[]> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Persona[]>(url);
  }

  guardarPersona(persona: Persona): Observable<Persona[]> {
    const url = `${this.apiUrl}`;
    return this.http.post<Persona[]>(url, persona);
  }

  actualizarPersona(persona: Persona): Observable<Persona[]> {
    const url = `${this.apiUrl}/${persona.id}`;
    return this.http.put<Persona[]>(url, persona);
  }

  eliminarPersona(id: string): Observable<Persona[]> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Persona[]>(url);
  }

  // const url = `${ this.apiUrl }/name/${ termino }`;



  //   - Consultar Todos (GET): https://632c95941aabd837399f4600.mockapi.io/api/v1/person
  //       - Consultar Uno (GET): https://632c95941aabd837399f4600.mockapi.io/api/v1/person/{id}
  //       - Guardar (POST): https://632c95941aabd837399f4600.mockapi.io/api/v1/person
  //       - Actualizar (PUT): https://632c95941aabd837399f4600.mockapi.io/api/v1/person/{id}
  //       - Eliminar (DELETE): https://632c95941aabd837399f4600.mockapi.io/api/v1/person/{id}
}
