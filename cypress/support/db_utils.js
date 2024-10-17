export function buildChargerInfoQueries(chargerInfo) {
    const uuid = chargerInfo.uuid;
    const connector_id = chargerInfo.connector_info.connector_id;
    const type = chargerInfo.connector_info.type;
    const mode = chargerInfo.connector_info.mode;
    const power = parseFloat(chargerInfo.connector_info.power.replace('kW', '')); // Remove 'kW' and parse to float
    const current = parseFloat(chargerInfo.connector_info.current.replace('A', '')); // Remove 'A' and parse to float
    const voltage = parseFloat(chargerInfo.connector_info.voltage.replace('V', '')); // Remove 'V' and parse to float
    const serial = chargerInfo.connector_info.serial;
  
    const STATUS_QUERY = `select status from public.connectors where chargepoint_id = '${uuid}' and connector_id = ${connector_id}`;
    const ACTIVE_TRANSACTION_QUERY = `select active_transaction_uuid from public.connectors where chargepoint_id = '${uuid}' and connector_id = ${connector_id} and status = 'Available'`;
    const SET_CONNECTOR_CONFIG_QUERY = `update public.connectors set type = '${type}', mode = '${mode}', power = ${power}, current = ${current}, voltage = ${voltage}, label = 'CONNECTOR_${connector_id}' where connector_id = ${connector_id} and chargepoint_id = '${uuid}'`;
    const SET_PHYSICAL_REFERENCE_QUERY = `update public.evses set physical_reference = '${serial}' where evse_num = ${connector_id} and chargepoint_id = '${uuid}'`;
    const SERIAL_OCPP = `select chargepoint_id from public.chargepoints where serial_ocpp = 'QA_TEMPORARY'`
  
    return {
      STATUS_QUERY,
      ACTIVE_TRANSACTION_QUERY,
      SET_CONNECTOR_CONFIG_QUERY,
      SET_PHYSICAL_REFERENCE_QUERY,
      SERIAL_OCPP,
    };
  }
  