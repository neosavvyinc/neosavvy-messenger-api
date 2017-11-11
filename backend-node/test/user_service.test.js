import * as UserService from '../src/messenger/user_service';
import * as UserDataAccess from '../src/messenger/user_data';

import _ from 'lodash';

import {
    assert,
    expect
} from 'chai';
import sinon from 'sinon';

describe('addUser', function() {

    describe('success conditions', function() {
        let stubUserDataService;
        beforeEach(function() {
            stubUserDataService = {
                insertUser: sinon.stub(UserDataAccess, 'insertUser').callsFake((user) => {
                    const fakeResult = _.merge({id: 42}, user);
                    const promise = new Promise(
                        success => {
                            success(fakeResult);
                        },
                        error => {
                            error(fakeResult)
                        });
                    return promise;
                })
            };
        });


        it('should call the insert user function with params', async function() {
            const stub = stubUserDataService.insertUser;
            const sampleUser = { username: 'test', password: 'pass' };
            const result = await UserService.addUser(sampleUser);
            assert(UserDataAccess.insertUser.calledOnce);
            expect(result).to.equal(42);
            stub.restore();
        });

        it('should call the findUserByUsername function', async function() {
            const spy = sinon.spy(UserDataAccess, 'findUserByUsername');
            const stub = stubUserDataService.insertUser;
            await UserService.addUser({ username: 'test', password: 'pass' });
            assert(UserDataAccess.findUserByUsername.calledOnce);
            spy.reset();
            spy.restore();
            stub.restore();
        });
    });

    describe('error conditions', function() {

        let errorSpy, addUser;
        beforeEach(function() {
            errorSpy = sinon.spy();
            addUser = async (fakeUser) =>  {
                try {
                    await UserService.addUser(fakeUser).catch(errorSpy);
                } catch (e) {
                    console.log('throwing error: ', e.message);
                    throw new Error(e.message);
                }
            };
        });

        it('should throw an exception when user name is empty', async function() {
            await addUser({});
            expect(errorSpy.callCount).to.equal(1);
            expect(errorSpy.args[0][0].message).to.equal('Username was not provided, please provide a username')
        });

        it('should throw an exception when user name is set but password empty', async function() {
            await addUser({ username: 'test'});
            expect(errorSpy.callCount).to.equal(1);
            expect(errorSpy.args[0][0].message).to.equal('Password was not provided, please provide a password')
        });

        it('should throw an error when a username is found for the one provided', async function() {
            const stub = sinon.stub(UserDataAccess, 'findUserByUsername').callsFake((user) => { return user });
            await addUser({ username: 'nonunique', password: 'test'});
            expect(errorSpy.args[0][0].message).to.equal('Please provide a unique username');
            stub.restore();
        });
    });

});