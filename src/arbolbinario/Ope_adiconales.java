/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package arbolbinario;

/**
 *
 * @author duvanbotello
 */
public class Ope_adiconales {

    public String mayorValor(NodoArbol r) {

        if (r != null) {
            while (r.getDer() != null) {
                r = r.getDer();
            }
            return ("" + r.getDato());
        }else{
        return "0";
        }
        
    }
    
    public NodoArbol mayorValor1(NodoArbol r) {

        if (r != null) {
            while (r.getDer() != null) {
                r = r.getDer();
            }
        }
        return r;
    }
    
    public String menorValor(NodoArbol r) {

        if (r != null) {
            while (r.getIzq() != null) {
                r = r.getIzq();
            }
            return ("" + r.getDato());
        }else{
            return "0";
        }
    }
     
}
