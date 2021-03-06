import * as UserService from './user_service';
import _ from 'lodash';

/***
 * Primary focus of this layer is to extract all the various params
 *
 * - Route/Path Params
 * - Query Params
 *
 * Immediately after delegation to the user_service happens for error
 * handling and interaction with data access layer
 *
 * This layer will not be heavily tested via Mocha as other layers will.
 * This layer is primarily integration tested via PostMan
 */

export const BASE_USER_ROUTE = '/users';

export const GET_USERS = async (request, response) => {
    const users = await UserService.findAllUsers();
    response.json({ 'users': users });
};

export const NEW_USER = async (request, response) => {
    const username = request.body.username;
    const password = request.body.password;
    const user = {
        username,
        password
    };
    const userId = await UserService.addUser(user);
    response.json(_.merge({}, { userId }, user));
};

export const UPDATE_USER = (request, response) => {
    response.json({ 'status': 'put - unimplemented' })
};

export const DELETE_USER = (request, response) => {
    response.json({ 'status': 'delete - unimplemented' })
};