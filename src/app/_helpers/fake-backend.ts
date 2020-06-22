import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { UserDashboard } from '../models/userDashboard';

let users = JSON.parse(localStorage.getItem('users')) || [];
let Dashboardusers = JSON.parse(localStorage.getItem('dashboard_users')) ||[];


@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) 
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();

                case url.endsWith('/users/register') && method === 'POST':
                    return register();

                case url.endsWith('/users/registerDashboard') && method === 'POST':   
                    return registerDashboard();

                case url.endsWith('/users/updateDashboard') && method === 'PUT':   
                    return updateDashboard();

                case url.endsWith('/users') && method === 'GET':
                    return getUsers();

                case url.match(/\/users\/\d+$/) && method === 'DELETE':
                    return deleteUser();
                default:
                    return next.handle(request);
            }    
        }


        function authenticate() {
            const { username, password } = body;
            const user = users.find(x => x.username === username && x.password === password);
            if (!user) return error('Username or Password is incorrect');
            return ok({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                token: 'fake-jwt-token'
            })
        }

        function register() {
            const user = body

            if (users.find(x => x.username === user.username)) {
                return error('Username "' + user.username + '" is already taken')
            }

            user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));

            return ok();
        }
        function registerDashboard() {
            
            const userDash = body

            if (Dashboardusers.find(x => x.name === userDash.name)) {
                return error('Username "' + userDash.name + '" is already taken')
            }

            userDash.id = Dashboardusers.length ? Math.max(...Dashboardusers.map(x => x.id)) + 1 : 1;
            
            Dashboardusers.push(userDash);
            localStorage.setItem('dashboard_users', JSON.stringify(Dashboardusers));
            return ok();
        }
        function getUsers() {
            if (!isLoggedIn()) return unauthorized();
            return ok(Dashboardusers);
        }

        function deleteUser() {
            if (!isLoggedIn()) return unauthorized();

            Dashboardusers = Dashboardusers.filter(x => x.id !== idFromUrl());
            localStorage.setItem('dashboard_users', JSON.stringify(Dashboardusers));
            return ok();
        }
        function updateDashboard(){
            
            const updateDash = body
            var index = Dashboardusers.findIndex(item => item.id === updateDash.id)
            Dashboardusers.splice(index, updateDash.id, updateDash)
            
          localStorage.setItem('dashboard_users', JSON.stringify(Dashboardusers));

            return ok();
        }
        // helper functions

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
    }
}

export const fakeBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};