<script setup lang="ts"></script>

<template>
  <div>
    <div class="min-h-screen flex flex-col">
      <OrganismsAuthHeader />

      <div
        class="flex-grow flex justify-center items-center space-x-28 m-8 lg:m-0"
      >
        <div
          class="w-full md:w-1/2 flex justify-center md:justify-end items-center"
        >
          <div class="p-8 rounded-lg w-full max-w-md">
            <MoleculesAuthWelcome>Register</MoleculesAuthWelcome>
            <MoleculesRegisterForm />
            <MoleculesRegisterFooter />
          </div>
        </div>
        <div class="hidden w-1/2 md:flex justify-start items-center">
          <img
            src="/sign-in-illustration.svg"
            width="300"
            alt="Sign In Illustration"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script scope></script>
