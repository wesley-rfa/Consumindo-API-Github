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
            let nome = res.name
            let concat = `<div class="col-lg-3 align-items-center pt-2 card" onclick="abrirModalUser('${res.login}','${res.avatar_url}','${res.name}','${res.public_repos}','${res.followers}','${res.following}','${res.location}','${res.bio}','${res.html_url}','${res.created_at}','${res.updated_at}')">
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
            $("#modal_erro").modal()
            $("#user_nao_encontrado").html(usuario)
            $("#form_usuario").val("")
        }
    });
});

//------------------Modal Usuário-------------------//
function abrirModalUser(login, foto, nome, repo, seguidores, seguindo, local, bio, url, dataCadastro, dataAtualizacao) {
    //-------------Formatando as datas--------------//
    anoCadastro = dataCadastro.substring(0, 4)
    mesCadastro = dataCadastro.substring(5, 7)
    diaCadastro = dataCadastro.substring(8, 10)
    dataCadastro = diaCadastro+'/'+mesCadastro+'/'+anoCadastro

    anoAtualizacao = dataAtualizacao.substring(0, 4)
    mesAtualizacao = dataAtualizacao.substring(5, 7)
    diaAtualizacao = dataAtualizacao.substring(8, 10)
    dataAtualizacao = diaAtualizacao+'/'+mesAtualizacao+'/'+anoAtualizacao


    $("#modal_user").modal()

    let concat = `<a href="${url}" target="_blank"><div class="row">
    <div class="col-3 text-center">
        <img src="${foto}">
        <div class="mt-2 name">${nome}</div>
        <div class="mt-1 user ">@${login}</div>
    </div>
    <div class="col-9">
        <div class="mt-2 topico">bio: <span>${bio}</span></div>
        <div class="mt-2 topico ">local: <span >${local}</span> </div>
        <div class="mt-2 topico ">Data Cadastro: <span >${dataCadastro}</span></div>
        <div class="mt-2 topico ">Última atualização: <span >${dataAtualizacao}</span></div>
    </div>
</div>


<div class="row justify-content-center text-center mt-2 infos">
        <div class="info-item">
            <div class="number">${seguidores}</div>
            <div> <i class="fa fa-users mr-1"></i>Seguidores</div>
        </div>
        <div class="info-item">
            <div class="number">${repo}</div>
            <div> <i class="fa fa-github-square mr-1"></i>Repositórios</div>
        </div>
        <div class="info-item">
            <div class="number">${seguindo}</div>
            <div> <i class="fa fa-users mr-1"></i>Seguindo</div>
        </div>
</div></a>`
    $("#modal_conteudo").html(concat)
}