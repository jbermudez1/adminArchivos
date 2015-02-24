$(function(){
    var $salesMonth = $('#salesMonth'),
        $memberMonth  = $('#membersMonth'),
        $withdrawalsMonth = $('#withdrawalsMonth'),
        $earningMonth = $('#earningsMonth');


    // Functions
    function getData() {
        CRUD.ajax('admin/statistics_data',{},function(){
            Helper.blockDiv('#div-sales');
            Helper.blockDiv('#div-members');
            Helper.blockDiv('#div-earnings');
            Helper.blockDiv('#div-withdrawals');
        },function(response) {
            createChart(response);
        });
    }

    function createChart(data) {
        // Unblock divs
        Helper.unblockDiv('#div-sales');
        Helper.unblockDiv('#div-members');
        Helper.unblockDiv('#div-earnings');
        Helper.unblockDiv('#div-withdrawals');

        // Variables
        var previousPointSale = null,
            previousPointMember = null,
            previousPointWithdrawals = null,
            previousPointEarnings = null;

        // Sales
        $.plot($salesMonth,
            [
                {
                    label: 'Ventas',
                    data: data.sales,
                    lines: {show: true, fill: true, fillColor: {colors: [{opacity: .6}, {opacity: .6}]}},
                    points: {show: true, radius: 5}
                }
            ],
            {
                colors: ['#5ccdde', '#454e59', '#ffffff'],
                legend: {show: true, position: 'nw', backgroundOpacity: 0},
                grid: {borderWidth: 0, hoverable: true, clickable: true},
                yaxis: {tickColor: '#f5f5f5', ticks: 3},
                xaxis: {ticks: data.labels, tickColor: '#f5f5f5'}
            }
        );

        // Members
        $.plot($memberMonth,
            [
                {
                    label: 'Miembros',
                    data: data.members,
                    lines: {show: true, fill: true, fillColor: {colors: [{opacity: .6}, {opacity: .6}]}},
                    points: {show: true, radius: 5}
                }
            ],
            {
                colors: ['#5ccdde', '#454e59', '#ffffff'],
                legend: {show: true, position: 'nw', backgroundOpacity: 0},
                grid: {borderWidth: 0, hoverable: true, clickable: true},
                yaxis: {tickColor: '#f5f5f5', ticks: 3},
                xaxis: {ticks: data.labels, tickColor: '#f5f5f5'}
            }
        );

        // Withdrawals
        $.plot($withdrawalsMonth,
            [
                {
                    label: 'Retiros',
                    data: data.withdrawals,
                    bars: {show: true, lineWidth: 0, fillColor: {colors: [{opacity: .6}, {opacity: .6}]}}
                }
            ],
            {
                colors: ['#5ccdde', '#454e59', '#ffffff'],
                legend: {show: true, position: 'nw', backgroundOpacity: 0},
                grid: {borderWidth: 0, hoverable: true, clickable: true},
                yaxis: {tickColor: '#f5f5f5', ticks: 3},
                xaxis: {ticks: data.labels, tickColor: '#f5f5f5'}
            }
        );

        // Earnings
        $.plot($earningMonth,
            [
                {
                    label: 'Retiros',
                    data: data.earnings,
                    bars: {show: true, lineWidth: 0, fillColor: {colors: [{opacity: .6}, {opacity: .6}]}}
                }
            ],
            {
                colors: ['#5ccdde', '#454e59', '#ffffff'],
                legend: {show: true, position: 'nw', backgroundOpacity: 0},
                grid: {borderWidth: 0, hoverable: true, clickable: true},
                yaxis: {tickColor: '#f5f5f5', ticks: 3},
                xaxis: {ticks: data.labels, tickColor: '#f5f5f5'}
            }
        );


        $salesMonth.bind('plothover', { previousPoint: previousPointSale, agregate: 'Q. ' },hoverChart);
        $memberMonth.bind('plothover', { previousPoint: previousPointMember, agregate: '' },hoverChart);
        $withdrawalsMonth.bind('plothover', { previousPoint: previousPointWithdrawals, agregate: 'Q. ' },hoverChart);
        $earningMonth.bind('plothover', { previousPoint: previousPointEarnings, agregate: 'Q.' },hoverChart);
    }

    function hoverChart(event, pos, item)
    {
        if (item) {
            if (event.data.previousPoint !== item.dataIndex) {
                event.data.previousPoint = item.dataIndex;

                $('#chart-tooltip').remove();
                var x = item.datapoint[0], y = item.datapoint[1];
                var ttlabel = null;
                if (item.seriesIndex === 0) {
                    ttlabel = event.data.agregate + '<strong>' + y.formatMoney(2) + '</strong>';
                } else if (item.seriesIndex === 1) {
                    ttlabel = '<strong>' + y.formatMoney(2) + '</strong> sales';
                } else {
                    ttlabel = '<strong>' + y.formatMoney(2) + '</strong> tickets';
                }

                $('<div id="chart-tooltip" class="chart-tooltip">' + ttlabel + '</div>')
                    .css({top: item.pageY - 45, left: item.pageX + 5}).appendTo("body").show();
            }
        }
        else {
            $('#chart-tooltip').remove();
            event.data.previousPoint = null;
        }
    }

    // Start
    getData()
});