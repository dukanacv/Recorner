using System.Runtime.Serialization;

namespace API.Models.OrderAggregate
{
    public enum OrderStatus
    {
        [EnumMember(Value = "Na cekanju")]
        NaCekanju,

        [EnumMember(Value = "Uspesno placanje")]
        UspesnoPlacanje,

        [EnumMember(Value = "Placanje nije uspelo")]
        PlacanjeNijeUspelo

    }
}