using Alura.ListaLeitura.Persistencia;
using Alura.ListaLeitura.Modelos;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Alura.WebAPI.WebApp.Api
{
    [ApiController]
    [Route("api/[controller]")]
    public class LivrosController : ControllerBase
    {
        private readonly IRepository<Livro> _repo;


        public LivrosController(IRepository<Livro> repository)
        {
            _repo = repository; 
        }

        [HttpGet]
        public IActionResult ListaDeLivros()
        {
            var lista = _repo.All.Select(l => l.ToApi()).ToList();
            return Ok(lista);
        }

        [HttpGet("{id}")]
        public IActionResult Recuperar(int id)
        {
            var model = _repo.Find(id);
            if(model == null)
            {
                return StatusCode(404);
            }
            return Ok(model.ToApi());
        }

        [HttpGet("{id}/capa")]
        public IActionResult ImagemCapa(int id)
        {
            byte[] img = _repo.All
             .Where(l => l.Id == id)
             .Select(l => l.ImagemCapa)
             .FirstOrDefault();
            if (img != null)
            {
                return File(img, "image/png");
            }
            return File("~/images/capas/capa-vazia.png", "image/png");
        }
       

        [HttpPost]
        public IActionResult Incluir([FromBody] LivroUpload model)
        {
            if(ModelState.IsValid)
            {
                var livro = model.ToLivro();
                _repo.Incluir(livro);
                var uri = Url.Action("Recuperar", new { id = livro.Id });
                return Created(uri, livro); //201 seu post foi aceito e o conteudo iserido(criado) com sucesso 
            }
            return BadRequest(); // 405 requisição no formato errado
        }


        [HttpPut]
        
        public IActionResult Alterar([FromBody] LivroUpload model)
        {
            if (ModelState.IsValid)
            {
                var livro = model.ToLivro();
                if (model.Capa == null)
                {
                    livro.ImagemCapa = _repo.All
                        .Where(l => l.Id == livro.Id)
                        .Select(l => l.ImagemCapa)
                        .FirstOrDefault();
                }
                _repo.Alterar(livro);
                return Ok(); // deu tudo certo 
            }
            return BadRequest();
        }


        [HttpDelete("{id}")]
        
        public IActionResult Remover(int id)
        {
            var model = _repo.Find(id);
            if (model == null)
            {
                return NotFound(); // 404 conteudo não encontrado
            }
            _repo.Excluir(model);
            return NoContent(); // 204 executado com sucesso porem n tem mais conteudo ai
        }

    }
}
