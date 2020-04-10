<template>
<div class="auth">
	<form class="form login" v-if="isLogin" @submit.prevent="login()">
		<div class="form-header">
			<H2>Login</H2>
		</div>
		<div class="form-group">
			<div class="form-label">
				Username:
			</div>
			<input type="text" class="form-input" v-model="loginReq.username">
		</div>
		<div class="form-group">
			<div class="form-label">Password: </div>
			<input type="password" class="form-input" v-model="loginReq.password">
		</div>
		<button type="submit" class="submit">Login</button>
		<button type="button" class="switch" @click="switchForm()">Switch to Register</button>
	</form>
	<form class="form register" v-else @submit.prevent="register()">
		<div class="form-header">
			<h2>Register</h2>
		</div>
		<div class="form-group">
			<div class="form-label">Username:</div>
			<input type="text" class="form-input" v-model="registerReq.username">
		</div>
		<div class="form-group">
			<div class="form-label">Email: </div>
			<input type="email" class="form-input" v-model="registerReq.email">
		</div>
		<div class="form-group">
			<div class="form-label">Real Name:</div>
			<input type="text" class="form-input" v-model="registerReq.realName">
		</div>
		<div class="form-group">
			<div class="form-label">Password:</div>
			<input type="password" class="form-input" v-model="registerReq.password">
		</div>
		<div class="form-group">
			<div class="form-label">Confirm Password:</div>
			<input type="password" class="form-input" v-model="confirmPassword">
		</div>
		<button type="submit" class="submit">Register</button>
		<button type="button" class="switch" @click="switchForm()">Switch to Login</button>
	</form>
</div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { LoginReq, RegisterReq } from '@/proxy/requests';
import { actionFields, LoginAction, RegisterAction } from '../store/actions';
import { Action } from 'vuex-class';

@Component({
	name: 'auth',
	components: {}
})
export default class Auth extends Vue {
	@Action(actionFields.login) loginAction!: LoginAction;
	@Action(actionFields.register) registerAction!: RegisterAction;
	
	isLogin = true;

	loginReq = new LoginReq();
	registerReq = new RegisterReq();
	confirmPassword = '';
	error = '';

	switchForm() {
		this.isLogin = ! this.isLogin;
	}

	async login() {
		if (! this.loginReq.isValid()) {
			this.error = 'Username and password are both required.'
			return;
		};

		await this.loginAction(this.loginReq);
		this.$router.go(0);
		this.$emit('login');
	}

	async register() {
		if (! this.registerReq.isValid()) {
			this.error = 'All fields must be filled in';
			return;
		}

		if (this.registerReq.password !== this.confirmPassword) {
			this.error = 'Password fields do not match.'
			return;
		}
		
		this.registerAction(this.registerReq);
	}
}
</script>
<style lang="scss" scoped>
@import '../scss/__stuff.scss';
.auth {
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	justify-content: space-between;
	max-width: 500px;
	height: fit-content;

	.form {
		height: 100%;
		margin: 10px;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		text-align: left;
		background-color: rgb(184, 184, 184);
		padding: 24px;
		padding-top: 0;
		border-radius: 2px;
	
		.form-group {
			margin-bottom: 10px;

			.form-input {
				border-radius: 2px;
			}
		}

		.switch {
			align-self: flex-end;
		}

		.submit {
			align-self: flex-end;
			margin-bottom: 5px;
		}
	}
}
</style>