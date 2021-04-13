$("#btn_limpar").hide()


//---------------------LIMPA CONTEÚDO----------------------//
$("#btn_limpar").click(function () {
    $(".card").css("transform", "translateX(2000px)")
    setTimeout(function () { $("#conteudo").html("") }, 1000);
    $("#btn_limpar").hide()
});

//------------------BUSCA USUÁRIO NA API-------------------//
$("#btn_buscar").click(function () {
    event.preventDefault()
    let usuario = $("#form_usuario").val()

    $.ajax({
        url: "https://api.github.com/users/" + usuario, dataType: 'json',
        beforeSend: function () {
        }, success: function (res) {
            let concat = `<div class="col-lg-3 align-items-center pt-2 card">
            <div class="align-self-end icon_git"><i class="fa fa-github-square mr-1"></i></div>
            <img src="${res.avatar_url}">
            <div class="mt-2 name">${res.name}</div>
            <div class="mt-1 user">@${res.login}</div>
            <div class="row text-center mt-1 mb-2 p-2 infos">
                <div class="info-item">
                    <div class="number">${res.followers}</div>
                    <div> <i class="fa fa-users mr-1"></i>Seguidores</div>
                </div>
                <div class="info-item">
                    <div class="number">${res.public_repos}</div>
                    <div> <i class="fa fa-github-square mr-1"></i>Repositórios</div>
                </div>
                <div class="info-item">
                    <div class="number">${res.following}</div>
                    <div> <i class="fa fa-users mr-1"></i>Seguindo</div>
                </div>
            </div>
        </div>`
            $("#conteudo").append(concat)
            $("#form_usuario").val("")
            $("#btn_limpar").show()
        }, error: function () {
            console.log("erro!!")
            $("#form_usuario").val("")
        }
    });
});