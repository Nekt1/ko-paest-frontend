<template>
        <div class="d-flex flex-column flex-sm-row justify-content-between my-2 mt-4" id="profile-page">
            <div class="d-flex flex-column border-1 shadow-sm p-2 me-2 mb-3">
                <img src="../assets/profile-picture.png" alt="" class="d-block img-fluid ">
                <ul class="list-group list-group-flush my-2">
                    <li class="list-group-item"><span class="fw-bold">Name:</span> Artjoms</li>
                    <li class="list-group-item"><span class="fw-bold">Surname:</span> Kazmirčuks</li>
                    <li class="list-group-item">Hey, Artjoms Kazmirčuks!</li>
                    <li class="list-group-item"><span class="fw-bold">E-mail:</span> artjoms@kazmircuks.lv</li>
                </ul>
                <button class="btn btn-outline-danger mb-2" type="button">Change profile picture</button>
                <button class="btn btn-outline-danger mb-2" type="button">Change password</button>
            </div>
            <div class="d-flex flex-column border-1 flex-fill shadow-sm px-3">
                <p class="display-4 text-danger">Your saved recipes</p>
                    <div class="card mb-2">
                        <div class="row">
                            <div class="col-4">
                                <img src="https://spoonacular.com/recipeImages/640352-312x231" alt="" class="img-fluid me-2">
                            </div>
                            <div class="col-8 d-flex flex-column justify-content-evenly align-items-center">
                                <p class="lead my-0">Cranberry Apple Crisp</p>
                                <button type="button" class="btn btn-danger d-inline-block">Details</button>
                            </div>
                        </div>
                    </div>
                    <div class="card mb-2">
                        <div class="row">
                            <div class="col-4">
                                <img src="https://spoonacular.com/recipeImages/632572-312x231.jpg" alt="" class="img-fluid me-2">
                            </div>
                            <div class="col-8 d-flex flex-column justify-content-evenly align-items-center">
                                <p class="lead my-0">Apple Pie</p>
                                <button type="button" class="btn btn-danger d-inline-block">Details</button>
                            </div>
                        </div>
                    </div>
                    <div class="card mb-2">
                        <div class="row">
                            <div class="col-4">
                                <img src="https://spoonacular.com/recipeImages/632471-312x231.jpg" alt="" class="img-fluid me-2">
                            </div>
                            <div class="col-8 d-flex flex-column justify-content-evenly align-items-center">
                                <p class="lead my-0">Apple and Walnut Cake</p>
                                <button type="button" class="btn btn-danger d-inline-block">Details</button>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
</template>
