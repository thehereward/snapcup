/* Snap Structure */
export default interface Snap {
    to: String[] /* Recipient UIDs */;
    from: String /* Sender UID */;
    body: String /* Main Message */;
    timestamp: Date /* Date/time of Submission*/;
}
