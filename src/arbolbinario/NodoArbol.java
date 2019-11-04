package arbolbinario;

/**
 *
 * @author duvanbotello
 * @param <T>
 */
public class NodoArbol<T> {

    private T dato;
    private NodoArbol izq, der;

    public NodoArbol(T dato) {
        this.dato = dato;
        this.izq = null;
        this.der = null;
    }

    public T getDato() {
        return dato;
    }

    public void setDato(T dato) {
        this.dato = dato;
    }

    public NodoArbol getIzq() {
        return izq;
    }

    public void setIzq(NodoArbol izq) {
        this.izq = izq;
    }

    public NodoArbol getDer() {
        return der;
    }

    public void setDer(NodoArbol der) {
        this.der = der;
    }
    
    
    
    
}
