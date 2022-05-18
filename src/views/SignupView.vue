<template>
    <div class="container">
        <form class="my-4 mx-auto border border-1 border-danger p-4 rounded-3">
            <h2 class="mb-2 display-4 text-danger">Sign Up</h2>
            <div class="mb-2">
                <label for="exampleInputName" class="form-label">Name</label>
                <input type="text" class="form-control" id="exampleInputName">
            </div>
            <div class="mb-2">
                <label for="exampleInputSurname" class="form-label">Surname</label>
                <input type="text" class="form-control" id="exampleInputLastName">
            </div>
            <div class="mb-2">
              <label for="exampleInputEmail1" class="form-label">Email address</label>
              <input type="email" class="form-control" id="exampleInputEmail" aria-describedby="emailHelp">
            </div>
            <div class="mb-2">
              <label for="exampleInputPassword1" class="form-label">Password</label>
              <input type="password" class="form-control" id="exampleInputPassword">
            </div>
            <div class="mb-2">
                <label for="exampleInputPassword1" class="form-label">Repeat password</label>
                <input type="password" class="form-control" id="exampleInputPassword">
            </div>
            <div class="mb-2 form-check">
              <input type="checkbox" class="form-check-input" id="exampleCheck1">
              <label class="form-check-label" for="exampleCheck1">I agree with the Terms and Conditions</label>
            </div>
            <button type="submit" class="btn btn-outline-danger">Submit</button>
        </form>
    </div>
</template>
