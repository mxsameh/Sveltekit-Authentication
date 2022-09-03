<script lang="ts">
import { page } from "$app/stores";



  export let data;
  const users = data.users
  let deleteBox = false;
  let user : string;
  let target : HTMLDivElement
  let error : string
  const close = () => {
    deleteBox = false
  }
  const openBox = (e : any) =>
  {

    target = e.target;
    if(e.target.tagName != 'DIV')
    {
      target = e.target.parentNode
    }
    user = target.dataset.name as string
    deleteBox = true
  }
  const deleteUser = async () =>
  {
    const response = await fetch(`${$page.url.origin}/api/users`,{
      method : 'DELETE',
      body : JSON.stringify({username : user})
    })
    .then(res => res.json())

    if(response.isDeleted)
    {
      console.log( 'user delete succesfully' );
      target.remove()
    }else
    {
      console.log( ' something went wrong : user wasn\'t deleted' );
      error = response.error
    }

    deleteBox = false
  }
</script>

<section class="users">
  <h1 class="users__title">database users</h1>
  {#each users as user (user.id) }

  <div class="user" data-name={user.name} on:click={openBox}>
    <h2 class="user__name">{user.name}</h2>
    <p class="user__age">{user.age}</p>
  </div>
  {/each}
  
  {#if deleteBox }
  <div class="box" on:click|self={close}>
    <div class="box__content">
      <h3>Are you sure you want to delete {user} ?</h3>
      <div class="box__btns">
        <button class="box__btn" on:click={close}>cancel</button>
        <button class="box__btn delete-btn" on:click={deleteUser}>delete</button>
      </div>
    </div>
  </div>
  {/if}
  {#if error }
  <p class="users__error">{error}</p> 
  {/if}

</section>


<style lang="scss">
  .users{
    margin: 0 auto;
    max-width: 400px;

    &__title{
      text-transform: uppercase;
      margin: 24px 0;
      color: lightgoldenrodyellow;
      text-align: center;
    }
    &__error{
      font-size: 16px;
      color: crimson;
    }
  }
  .user{
    background-color: black;
    padding: 16px 32px;
    border-radius: 24px;
    transition: scale 1s linear;
    &:hover{
      background-color: #111;
      transform: scale(1.05);
      cursor: pointer;
    }

    &:not(:last-child){
      margin-bottom : 24px
    }
    &__name{
      text-align: center;
      text-transform: capitalize;
      color: palevioletred;
    }
    &__age{
      font-size: 20px;
      text-align: center;
      margin-top: 16px;
    }
  }

  .box{
    position: absolute;
    background-color: rgba($color: #000000, $alpha: .7);
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    &__content{
     background-color: #222; 
     padding: 32px 40px;
     border-radius: 16px;
    }
    &__btns{
      display: flex;
      gap: 24px;
      margin-top: 32px;
    }
    &__btn{
      flex-basis: 100%;
      background-color: #333;
      padding: 12px 24px;
      font-size: 20px;
      color: white;
      border-radius: 8px;
      text-transform: capitalize;
      &:hover{
        cursor: pointer;
      }
    }
    .delete-btn{
      background-color: red;
    }
  }

</style>