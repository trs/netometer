const netSpeedTester = require('./index');

describe('netSpeedTester', function () {

  describe('convertSpeed', function () {

    describe('from bps', function () {
      it('to bps', function () {
        const result = netSpeedTester.convertSpeed(1, 'bps', 'bps');
        expect(result).toEqual(1);
      });

      it('to kbps', function () {
        const result = netSpeedTester.convertSpeed(1, 'bps', 'kbps');
        expect(result).toEqual(0.001);
      });

      it('to mbps', function () {
        const result = netSpeedTester.convertSpeed(1, 'bps', 'mbps');
        expect(result).toEqual(0.000001);
      });
    });

    describe('from kbps', function () {
      it('to bps', function () {
        const result = netSpeedTester.convertSpeed(1, 'kbps', 'bps');
        expect(result).toEqual(1000);
      });

      it('to kbps', function () {
        const result = netSpeedTester.convertSpeed(1, 'kbps', 'kbps');
        expect(result).toEqual(1);
      });

      it('to mbps', function () {
        const result = netSpeedTester.convertSpeed(1, 'kbps', 'mbps');
        expect(result).toEqual(0.001);
      });

      it('to gbps', function () {
        const result = netSpeedTester.convertSpeed(1, 'kbps', 'gbps');
        expect(result).toEqual(0.000001);
      });
    });

    describe('from mbps', function () {
      it('to bps', function () {
        const result = netSpeedTester.convertSpeed(1, 'mbps', 'bps');
        expect(result).toEqual(1000000);
      });

      it('to kbps', function () {
        const result = netSpeedTester.convertSpeed(1, 'mbps', 'kbps');
        expect(result).toEqual(1000);
      });

      it('to mbps', function () {
        const result = netSpeedTester.convertSpeed(1, 'mbps', 'mbps');
        expect(result).toEqual(1);
      });

      it('to gbps', function () {
        const result = netSpeedTester.convertSpeed(1, 'mbps', 'gbps');
        expect(result).toEqual(0.001);
      });

      it('to tbps', function () {
        const result = netSpeedTester.convertSpeed(1, 'mbps', 'tbps');
        expect(result).toEqual(0.000001);
      });
    });

    describe('from gbps', function () {
      it('to bps', function () {
        const result = netSpeedTester.convertSpeed(1, 'gbps', 'bps');
        expect(result).toEqual(1000000000);
      });

      it('to kbps', function () {
        const result = netSpeedTester.convertSpeed(1, 'gbps', 'kbps');
        expect(result).toEqual(1000000);
      });

      it('to mbps', function () {
        const result = netSpeedTester.convertSpeed(1, 'gbps', 'mbps');
        expect(result).toEqual(1000);
      });

      it('to gbps', function () {
        const result = netSpeedTester.convertSpeed(1, 'gbps', 'gbps');
        expect(result).toEqual(1);
      });

      it('to tbps', function () {
        const result = netSpeedTester.convertSpeed(1, 'gbps', 'tbps');
        expect(result).toEqual(0.001);
      });

      it('to pbps', function () {
        const result = netSpeedTester.convertSpeed(1, 'gbps', 'pbps');
        expect(result).toEqual(0.000001);
      });
    });

    describe('from tbps', function () {
      it('to bps', function () {
        const result = netSpeedTester.convertSpeed(1, 'tbps', 'bps');
        expect(result).toEqual(1000000000000);
      });

      it('to kbps', function () {
        const result = netSpeedTester.convertSpeed(1, 'tbps', 'kbps');
        expect(result).toEqual(1000000000);
      });

      it('to mbps', function () {
        const result = netSpeedTester.convertSpeed(1, 'tbps', 'mbps');
        expect(result).toEqual(1000000);
      });

      it('to gbps', function () {
        const result = netSpeedTester.convertSpeed(1, 'tbps', 'gbps');
        expect(result).toEqual(1000);
      });

      it('to tbps', function () {
        const result = netSpeedTester.convertSpeed(1, 'tbps', 'tbps');
        expect(result).toEqual(1);
      });

      it('to pbps', function () {
        const result = netSpeedTester.convertSpeed(1, 'tbps', 'pbps');
        expect(result).toEqual(0.001);
      });
    });

    describe('from pbps', function () {
      it('to bps', function () {
        const result = netSpeedTester.convertSpeed(1, 'pbps', 'bps');
        expect(result).toEqual(1000000000000000);
      });

      it('to kbps', function () {
        const result = netSpeedTester.convertSpeed(1, 'pbps', 'kbps');
        expect(result).toEqual(1000000000000);
      });

      it('to mbps', function () {
        const result = netSpeedTester.convertSpeed(1, 'pbps', 'mbps');
        expect(result).toEqual(1000000000);
      });

      it('to gbps', function () {
        const result = netSpeedTester.convertSpeed(1, 'pbps', 'gbps');
        expect(result).toEqual(1000000);
      });

      it('to tbps', function () {
        const result = netSpeedTester.convertSpeed(1, 'pbps', 'tbps');
        expect(result).toEqual(1000);
      });

      it('to pbps', function () {
        const result = netSpeedTester.convertSpeed(1, 'pbps', 'pbps');
        expect(result).toEqual(1);
      });
    });
  });

});
