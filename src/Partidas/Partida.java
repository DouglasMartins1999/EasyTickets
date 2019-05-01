package Partidas;

public class Partida {
    private int cod;
    private String campeonato;
    private String estadio;
    private String nomeMandante;
    private String nomeVisitante;
    private int placarMandante;
    private int placarVisitante;
    private int data;
    private double peso;
    
    public Partida(){};
    
    public Partida(String nM, String nV, int pM, int pV, String c, String e, int d, double p){
        this.campeonato = c;
        this.estadio = e;
        this.nomeMandante = nM;
        this.nomeVisitante = nV;
        this.placarMandante = pM;
        this.placarVisitante = pV;
        this.data = d;
        this.peso = p;
    }
    
    public Partida(String nM, String nV, String c, String e, int d, double p){
        this.campeonato = c;
        this.estadio = e;
        this.nomeMandante = nM;
        this.nomeVisitante = nV;
        this.placarMandante = 0;
        this.placarVisitante = 0;
        this.data = d;
        this.peso = p;
    }
    
    public int getCod(){ return cod; }
    public String getCampeonato(){ return campeonato; }
    public String getEstadio(){ return estadio; }
    public String getNomeMandante(){ return nomeMandante; }
    public String getNomeVisitante(){ return nomeVisitante; }
    public int getPlacarMandante(){ return placarMandante; }
    public int getPlacarVisitante(){ return placarVisitante; }
    public int getData(){ return data; }
    public double getPeso(){ return peso; }
    
    public void setCod(int cod){ this.cod = cod; }
    public void setCampeonato(String c){ this.campeonato = c; }
    public void setEstadio(String e){ this.estadio = e; }
    public void setNomeMandante(String n){ this.nomeMandante = n; }
    public void setNomeVisitante(String n){ this.nomeVisitante = n; }
    public void setPlacarMandante(int p){ this.placarMandante = p; }
    public void setPlacarVisitante(int p){ this.placarVisitante = p; }
    public void setData(int d){ this.data = d; }
    public void setPeso(double p){ this.peso = p; }
    
    @Override
    public String toString(){
        return "Partida " + this.cod + "\n" +
            "Times: " + this.nomeMandante + " x " + this.nomeVisitante + "\n" +
            "Placar: " + this.placarMandante + " x " + this.placarVisitante + "\n" + 
            "Estádio: " + this.estadio + "\n" +
            "Campeonato: " + this.campeonato + "\n" + 
            "Data (TimeStamp): " + this.data + "\n" +
            "Peso: " + this.peso;
                
    }
}
