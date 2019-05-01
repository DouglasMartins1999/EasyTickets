package easytickets;

/**
 *
 * @author Douglas
 */
import Partidas.Partida;
import Ingressos.Ingresso;

public class EasyTickets {
    public static void main(String[] args) {
        Partida p = new Partida("Corinthians", "Palmeiras", 3, 2, "Brasileiro", "Itaquera", 3545, 4.5);
        Ingresso i = new Ingresso(p, 20);
        System.out.println(i.toString());
    }
}
