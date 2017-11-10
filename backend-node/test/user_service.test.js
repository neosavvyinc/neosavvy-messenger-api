import * as UserService from '../src/messenger/user_service';
import * as UserDataAccess from '../src/messenger/user_data';

import _ from 'lodash';

import {
    assert,
    expect
} from 'chai';
import sinon from 'sinon';

describe('addUser', function() {

    it('should call the insert user function with params', function() {
        const stub = sinon.stub(UserDataAccess, 'insertUser').callsFake((user) => {
            return _.merge({id: 42}, user);
        });
        const sampleUser = { username: 'test', password: 'pass' };
        const result = UserService.addUser(sampleUser);
        assert(UserDataAccess.insertUser.calledOnce);
        expect(result).to.equal(42);
        stub.restore();
    });

    it('should call the findUserByUsername', function() {
        const spy = sinon.spy(UserDataAccess, 'findUserByUsername');
        const stub = sinon.stub(UserDataAccess, 'insertUser').callsFake((user) => {
            return _.merge({id: 42}, user);
        });
        UserService.addUser({ username: 'test', password: 'pass' });
        assert(UserDataAccess.findUserByUsername.calledOnce);
        spy.restore();
        stub.restore();
    });

    describe('error conditions', function() {

        it('should throw an exception when user name is empty', function() {
            const addUser = () => {
                UserService.addUser({})
            };
            expect(addUser).to.throw('Username was not provided, please provide a username')
        });

        it('should throw an exception when user name is set but password empty', function() {
            const addUser = () => {
                UserService.addUser({ username: 'test'})
            };
            expect(addUser).to.throw('Password was not provided, please provide a password')
        });

        it('should throw an error when a username is found for the one provided', function() {
            const stub = sinon.stub(UserDataAccess, 'findUserByUsername').callsFake((user) => { return user });
            const addUser = () => {
                UserService.addUser({ username: 'nonunique', password: 'test'})
            };
            expect(addUser).to.throw('Please provide a unique username');
            stub.restore();
        });
    });

});