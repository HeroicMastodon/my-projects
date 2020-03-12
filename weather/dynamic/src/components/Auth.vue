<template>
<div class="auth">
	<form class="form login">
		<div class="form-header">
			<H2>Login</H2>
		</div>
		<div class="form-group">
			<div class="form-label">
				Username:
			</div>
			<input type="text" class="form-input">
		</div>
		<div class="form-group">
			<div class="form-label">Password: </div>
			<input type="password" class="form-input">
		</div>
		<button class="submit">Login</button>
	</form>
	<form class="form register">
		<div class="form-header">
			<h2>Register</h2>
		</div>
		<div class="form-group">
			<div class="form-label">Username:</div>
			<input type="text" class="form-input">
		</div>
		<div class="form-group">
			<div class="form-label">Email: </div>
			<input type="email" class="form-input">
		</div>
		<div class="form-group">
			<div class="form-label">Real Name:</div>
			<input type="text" class="form-input">
		</div>
		<div class="form-group">
			<div class="form-label">Password:</div>
			<input type="password" class="form-input">
		</div>
		<div class="form-group">
			<div class="form-label">Confirm Password:</div>
			<input type="password" class="form-input">
		</div>
		<button type="button" class="submit">Register</button>
	</form>
</div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';


@Component({
	name: 'auth',
	components: {}
})
export default class Auth extends Vue {}
</script>
<style lang="scss" scoped>
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
	
		.form-group {
			margin-bottom: 10px;
		}
	}
}
</style>