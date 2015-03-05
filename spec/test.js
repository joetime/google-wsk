describe("OMG a JavaScript Test", function() {
  it("should pass", function() {
    expect(true).toBe(false);
  });
  it("should pass this one", function() {
    expect(1==1).toBe(true);
  });
    it("should fail this one", function() {
    expect(1==2).toBe(true);
  });
});