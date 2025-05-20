programa
{
    cadeia nomes[3]

	inteiro i, j
	real notas[3][5]
	real soma,media

     funcao inicio()
	{

	para(i = 0; i < 3; i++) {
		escreva("Digite o nome do aluno ", i+1, ": ")
		leia(nomes[i])

     para (j = 0; j < 5; j++) {
		escreva("Digite a nota ", j+1, " de ", nomes[i], ": ")
		leia(notas[i][j])
	   }
     } 

     escreva("\n--- Tabela de Nitas ---\n")
        para(i = 0; i < 3; i++) {
        	escreva("Alunos: ",nomes[i], "-> Notas: \n")
        	soma = 0.0
        	para (j = 0; j < 5; j++) {
        		escreva(notas[i][j], " ")
        		soma=soma+notas[i][j]


}
          media=soma/5
          escreva("A média é: ",media)

          se(media>=69){
          	escreva("\n**aprovado*****\n")

          }senao se(media<60){
             escreva("\n***REPROVADO***")
          }
          }
	}
}          
/* $$$ Portugol Studio $$$ 
 * 
 * Esta seção do arquivo guarda informações do Portugol Studio.
 * Você pode apagá-la se estiver utilizando outro editor.
 * 
 * @POSICAO-CURSOR = 453; 
 * @PONTOS-DE-PARADA = ;
 * @SIMBOLOS-INSPECIONADOS = ;
 * @FILTRO-ARVORE-TIPOS-DE-DADO = inteiro, real, logico, cadeia, caracter, vazio;
 * @FILTRO-ARVORE-TIPOS-DE-SIMBOLO = variavel, vetor, matriz, funcao;
 */